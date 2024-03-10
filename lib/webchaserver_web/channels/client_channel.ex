defmodule WebchaserverWeb.ClientChannel do
  use WebchaserverWeb, :channel

  alias Webchaserver.Userclients

  @impl true
  def join("client:lobby", _payload, socket) do
    Userclients.create_userclient(%{user_id: socket.assigns.user_id, subtopic: socket.assigns.user_id})
    {:reply , {:ok, %{subtopic: socket.assigns.user_id}}, socket}
  end

  @impl true
  def join("client:" <> subtopic, _payload, socket) do
    if authorized?(socket.assigns.user_id, subtopic) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
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
