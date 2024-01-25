defmodule WebchaserverWeb.PageController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Userclients

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def test(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    token = Phoenix.Token.sign(conn, "user", conn.assigns[:current_user].id)
    render(assign(conn, :user_token, token), :test, layout: false)
  end

  def token(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.

    current_user = conn.assigns[:current_user]

    token = Phoenix.Token.sign(conn, "user", current_user.id)

    userclient = Userclients.get_userclient_latest2()

    IO.inspect(userclient)

    subtopic = ""

    #if userclient == nil do
      #subtopic = "1"
      #Userclients.create_userclient(%{user_id: current_user.id, subtopic: subtopic})
    #else
      #subtopic = userclient.subtopic
      #Userclients.create_userclient(%{user_id: current_user.id, subtopic: subtopic})
    #end

    render(assign(conn, :user_token, token), :token, layout: false, subtopic: subtopic)
  end

  def testverify(conn, %{ "token" => token }) do
    # The home page is often custom made,
    # so skip the default app layout.
    case Phoenix.Token.verify(conn, "user", token) do
      {:ok, user_id} ->
        render(conn, :testverify, layout: false, user_id: user_id)
      {:error, _} ->
        render(conn, :testverify, layout: false, user_id: nil)
    end
  end
end
