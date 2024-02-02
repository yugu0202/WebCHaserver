defmodule WebchaserverWeb.PageController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Userclients
  alias Webchaserver.Usermatchs
  alias Webchaserver.Matchresults
  alias Webchaserver.Logs

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def test(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    current_user = conn.assigns[:current_user]

    user = Userclients.get_userclient_by_user_id(current_user.id)

    IO.inspect(user)

    token = Phoenix.Token.sign(conn, "user", current_user.id)

    if user == nil do
      userclient = Userclients.get_userclient_latest2()
      subtopic =
      case userclient |> length do
        0 ->
          "1"
        1 ->
          hd(userclient).subtopic
        2 ->
          [first | second] = userclient
          second = hd(second)
          if first.subtopic == second.subtopic do
            String.to_integer(first.subtopic) + 1 |> Integer.to_string()
          else
            second.subtopic
          end
      end

      Userclients.create_userclient(%{user_id: current_user.id, subtopic: subtopic})
      subtopic
    else
      user.subtopic
    end

    render(assign(conn, :user_token, token), :test, layout: false)
  end

  def token(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.

    current_user = conn.assigns[:current_user]

    user = Userclients.get_userclient_by_user_id(current_user.id)

    IO.inspect(user)

    token = Phoenix.Token.sign(conn, "user", current_user.id)

    subtopic =
      if user == nil do
        userclient = Userclients.get_userclient_latest2()
        subtopic =
        case userclient |> length do
          0 ->
            "1"
          1 ->
            hd(userclient).subtopic
          2 ->
            [first | second] = userclient
            second = hd(second)
            if first.subtopic == second.subtopic do
              String.to_integer(first.subtopic) + 1 |> Integer.to_string()
            else
              second.subtopic
            end
        end

        Userclients.create_userclient(%{user_id: current_user.id, subtopic: subtopic})
        subtopic
      else
        user.subtopic
      end

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

  def mymatch(conn, _params) do
    matchs = Usermatchs.list_usermatchs_by_user_id_is_end(conn.assigns[:current_user].id)
    results = matchs
    |> Enum.map(fn(match) ->
      match_id = match.match_id
      player = match.player
      matchresult = Matchresults.get_matchresult_by_match_id(match_id)
      %{match_id: match_id, player: player, result: matchresult.result}
    end)

    render(conn, :mymatch, layout: false, results: results)
  end

  def viewmatch(conn, %{"match_id" => match_id}) do
    render(assign(assign(conn, :match_id, match_id), :is_view, "true"), :viewmatch, layout: false)
  end
end
