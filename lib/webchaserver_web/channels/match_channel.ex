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
    case authorized?(socket.assigns.user_id, subtopic) do
      {:ok, player} ->
        send(self(), :after_join)
        {:ok, assign(socket, :player, player)}
      {:error, _} ->
        {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("call", %{"action" => action}, socket) do
    IO.puts "action #{action}"
    member = Presence.list(socket) |> map_size()

    IO.inspect(Presence.list(socket))

    case {action, member} do
      {"matching", 1} ->
        {:reply,{:ok, %{data: "waiting"}}, socket}
      {_, 1} ->
        {:stop, :shutdown, socket}
      {"matching", 2} ->
        if Usermatchs.exist_usermatch_by_user_id_not_end(socket.assigns.user_id) do
          %{match_id: id} = Usermatchs.get_usermatch_by_user_id_not_end(socket.assigns.user_id)
          log = Logs.get_log_by_match_id_latest(id)
          case log do
            %{action: "match"} ->
              broadcast(socket, "ready", %{data: "cool"})
          end
        end

        {:noreply, socket}
      {_, 2} ->
        unless Usermatchs.exist_usermatch_by_user_id_not_end(socket.assigns.user_id) do
          {:stop, :shutdown, socket}
        else
          player = socket.assigns.player
          IO.puts "player: #{player}"
          %{match_id: id} = Usermatchs.get_usermatch_by_user_id_not_end(socket.assigns.user_id)
          log = Logs.get_log_by_match_id_latest(id)
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
          end

          IO.puts "ret: #{inspect(ret)}"
          {:reply, {:ok, %{data: ret}}, socket}
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

  defp authorized?(user_id, subtopic) do
      IO.puts "id: #{user_id}"

      %{match_id: match_id, player: player} = Usermatchs.get_usermatch_by_user_id_not_end(user_id)

      if Integer.to_string(match_id) == subtopic do
        {:ok, player}
      else
        {:error, %{reason: "unauthorized"}}
      end
  end
end
