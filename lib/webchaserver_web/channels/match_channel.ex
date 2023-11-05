defmodule WebchaserverWeb.MatchChannel do
  use WebchaserverWeb, :channel

  alias Webchaserver.Matchs
  alias Webchaserver.Matchs.Match

  @impl true
  def join("match:lobby", payload, socket) do
    if authorized?(payload) do
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

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
