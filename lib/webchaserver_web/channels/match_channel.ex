defmodule WebchaserverWeb.MatchChannel do
  use WebchaserverWeb, :channel

  alias WebchaserverWeb.Presence
  alias Webchaserver.Matchs
  alias Webchaserver.Matchs.Match
  alias Webchaserver.Userclients
  alias Webchaserver.Userclients.Userclient
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
        broadcast(socket, "call", %{data: %{ready: "waiting"}})
      {"matching", 2} ->
        mapdata = "
          D:0,0,3,0,3,0,3,0,0,0,0,0,0,0,0
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
          D:0,0,0,0,0,0,0,0,3,0,3,0,3,0,0
        "

        Matchs.create_match(%{map: String, cool_pos: "0,0", hot_pos: "14,16", size: "15x17"})
        broadcast(socket, "call", %{data: %{ready: "ready"}})
      {_, 2} ->
        IO.inspect(socket.assigns)
        ret = Matchsystem.command(action)
        push(socket, "call", %{data: ret})
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
