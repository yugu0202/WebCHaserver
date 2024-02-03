defmodule WebchaserverWeb.PageController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Userclients
  alias Webchaserver.Usermatchs
  alias Webchaserver.Matchresults

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
    month_format = %{1 => "Jan", 2 => "Feb", 3 => "Mar", 4 => "Apr", 5 => "May", 6 => "Jun", 7 => "Jul", 8 => "Aug", 9 => "Sep", 10 => "Oct", 11 => "Nov", 12 => "Dec"}
    matchs = Usermatchs.list_usermatchs_by_user_id_is_end(conn.assigns[:current_user].id)
    results = matchs
    |> Enum.map(fn(match) ->
      match_id = match.match_id
      player = match.player
      matchresult = Matchresults.get_matchresult_by_match_id(match_id)
      jst = DateTime.from_naive!(matchresult.inserted_at, "Asia/Tokyo")
      date = "#{jst.year} #{month_format[jst.month]} #{jst.day} #{jst.hour |> Integer.to_string() |> String.pad_leading(2, "0")}:#{jst.minute |> Integer.to_string() |> String.pad_leading(2, "0")}"
      %{match_id: match_id, player: player, result: matchresult.result, date: date}
    end)

    render(conn, :mymatch, layout: false, results: results)
  end

  def viewmatch(conn, %{"match_id" => match_id}) do
    render(assign(assign(conn, :match_id, match_id), :is_view, "true"), :viewmatch, layout: false)
  end
end
