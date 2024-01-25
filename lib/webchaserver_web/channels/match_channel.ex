defmodule WebchaserverWeb.MatchChannel do
  use WebchaserverWeb, :channel

  alias WebchaserverWeb.Presence
  alias Webchaserver.Matchs
  alias Webchaserver.Matchs.Match
  alias Webchaserver.Userclients
  alias Webchaserver.Userclients.Userclient

  @impl true
  def join("match:" <> subtopic, _payload, socket) do
    if authorized?(socket.assigns.user_id, subtopic) do
      send(self(), :after_join)
      {:ok, socket}
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
      {"matching", 2} ->
        broadcast(socket, "matching", %{data: %{ready: "ready"}})
      {"matching", 1} ->
        broadcast(socket, "matching", %{data: %{ready: "waiting"}})
      {"getready", 2} ->
        user_id = Integer.to_string(socket.assigns.user_id)
        %{^user_id => data} = Presence.list(socket)
        IO.inspect(data)
        IO.inspect(socket.assigns)
        push(socket, "call", %{data: "arround data"})
      {_, 2} ->
        Matchsystem.command(action)
    end

    {:noreply, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id , %{
        online_at: inspect(System.system_time(:second)),
      })

    {:noreply, socket}
  end

  defp authorized?(id, subtopic) do
      IO.puts "id: #{id}"

      %{subtopic: sub} = Userclients.get_userclient_by_user_id!(id)

      IO.puts "sub: #{sub}"

      if sub == subtopic do
        true
      else
        false
      end
  end
end
