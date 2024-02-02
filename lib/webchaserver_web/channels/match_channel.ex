defmodule WebchaserverWeb.MatchChannel do
  use WebchaserverWeb, :channel

  alias WebchaserverWeb.Presence
  alias Webchaserver.Matchs
  alias Webchaserver.Userclients
  alias Webchaserver.Logs
  alias Webchaserver.Usermatchs
  alias Webchaserver.Matchsystem

  @impl true
  def join("match:" <> subtopic, _payload, socket) do
    if authorized?(socket.assigns.user_id, subtopic) do
      send(self(), :after_join)
      %{id: register_id} = Userclients.get_userclient_by_user_id(socket.assigns.user_id)

      %{id: first_register_id} = Userclients.get_userclient_by_subtopic(subtopic)
      if register_id == first_register_id do
        {:ok, assign(socket, :player, "cool")}
      else
        {:ok, assign(socket, :player, "hot")}
      end
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  @impl true
  def handle_in("shout", _payload, socket) do
    broadcast(socket, "shout", %{data: for(match <- Matchs.list_matchs(), do: %{match: match})})
    {:noreply, socket}
  end

  @impl true
  def handle_in("call", %{"action" => action}, socket) do
    IO.puts "action #{action}"
    member = Presence.list(socket) |> map_size()

    case {action, member} do
      {_, 1} ->
        {:reply,{:ok, %{data: "waiting"}}, socket}
      {"matching", 2} ->
        users = Enum.map(Presence.list(socket), fn(x) -> Kernel.elem(x, 0) end)

        unless Usermatchs.exist_usermatch_by_user_id_not_end(hd(users)) do
          size = [15,17]
          turn = 100
          cool_pos = [0,0]
          hot_pos = [14,16]
          mapdata =
            "D:0,0,3,0,3,0,3,0,0,0,0,0,0,0,0
            D:3,2,2,0,2,2,0,2,0,2,2,2,0,2,0
            D:0,0,3,0,3,2,3,0,3,2,0,3,0,3,0
            D:0,2,0,2,0,2,0,2,0,0,0,2,2,2,0
            D:0,2,3,2,3,2,3,2,3,2,0,3,0,3,0
            D:0,2,0,2,0,2,0,2,0,0,0,2,2,2,0
            D:0,0,3,0,3,0,3,0,3,2,0,3,0,3,0
            D:0,2,2,0,2,0,2,2,0,2,0,2,0,2,0
            D:0,0,0,0,0,0,0,3,0,0,0,0,0,0,0
            D:0,2,0,2,0,2,0,2,2,0,2,0,2,2,0
            D:0,3,0,3,0,2,3,0,3,0,3,0,3,0,0
            D:0,2,2,2,0,0,0,2,0,2,0,2,0,2,0
            D:0,3,0,3,0,2,3,2,3,2,3,2,3,2,0
            D:0,2,2,2,0,0,0,2,0,2,0,2,0,2,0
            D:0,3,0,3,0,2,3,0,3,2,3,0,3,0,0
            D:0,2,0,2,2,2,0,2,0,2,2,0,2,2,3
            D:0,0,0,0,0,0,0,0,3,0,3,0,3,0,0"
            |> String.replace(["D:", " "], "") #とりあえずサンプルデータとして成形
            |> String.split("\n")
            |> Enum.map(&String.split(&1, ","))
            |> Enum.flat_map(&(&1))
            |> Enum.map(&String.to_integer(&1))
            |> Enum.chunk_every(Enum.at(size, 0))

          {:ok, %{id: id}} = Matchs.create_match(%{map: mapdata, cool_pos: cool_pos, hot_pos: hot_pos, size: size, turn: turn})
          Logs.create_log(%{match_id: id, player: "cool", action: "matching", return: [], map_data: mapdata, map_size: size,turn: turn, cool_pos: cool_pos, hot_pos: hot_pos, cool_score: 0, hot_score: 0})
          Usermatchs.create_usermatch2(%{user_id: hd(users), match_id: id, player: "cool"}, %{user_id: Enum.at(users, 1), match_id: id, player: "hot"})
        end

        broadcast(socket, "ready", %{data: "cool"})
        {:noreply, socket}
      {_, 2} ->
        unless Usermatchs.exist_usermatch_by_user_id_not_end(socket.assigns.user_id) do
          {:stop, :shutdown, socket}
        else
          player = socket.assigns.player
          %{match_id: id} = Usermatchs.get_usermatch_by_user_id_not_end(socket.assigns.user_id)
          log = Logs.get_log_by_match_id(id)
          {ret, is_end} = Matchsystem.action(id, player, action, log)

          unless action == "getready" do
            next_player = case player do
              "cool" ->
                "hot"
              "hot" ->
                "cool"
              end
            broadcast(socket, "ready", %{data: next_player})
          end

          if is_end do
            Usermatchs.update_usermatch_end(id)
            Userclients.delete_userclient_by_subtopic(String.replace(socket.topic, "match:", ""))
            {:stop, :shutdown, socket}
          else
            {:reply,{:ok, %{data: ret}}, socket}
          end
        end
    end
  end

  intercept ["ready"]

  @impl true
  def handle_out("ready", msg, socket) do
    cond do
      msg.data == "cool" and socket.assigns.player == "cool" ->
        push(socket, "ready", %{data: %{ready: "cool"}})
      msg.data == "hot" and socket.assigns.player == "hot" ->
        push(socket, "ready", %{data: %{ready: "hot"}})
      true ->
        {:noreply, socket}
    end

    {:noreply, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do

    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id , %{
        online_at: System.system_time(:second) |> inspect(),
      })


      {:noreply, socket}
  end

  defp authorized?(id, subtopic) do
      IO.puts "id: #{id}"

      %{subtopic: sub} = Userclients.get_userclient_by_user_id(id)

      IO.puts "sub: #{sub}"

      if sub == subtopic do
        true
      else
        false
      end
  end
end
