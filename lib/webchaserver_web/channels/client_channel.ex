defmodule WebchaserverWeb.ClientChannel do
  use WebchaserverWeb, :channel

  alias Webchaserver.Userclients

  @impl true
  def join("client:lobby", _payload, socket) do
    unless Userclients.get_userclient_by_user_id(socket.assigns.user_id) do
        Userclients.create_userclient(%{user_id: socket.assigns.user_id, subtopic: Integer.to_string(socket.assigns.user_id), locked: true})
    end

    {:ok, %{subtopic: Integer.to_string(socket.assigns.user_id)}, socket}
  end

  @impl true
  def join("client:" <> subtopic, _payload, socket) do
    if authorized?(socket.assigns.user_id, subtopic) do
      send(self(), :after_join)

      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_info(:after_join, socket) do
    Userclients.get_userclient_by_user_id(socket.assigns.user_id)
    |> Userclients.update_userclient(%{locked: false})

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
