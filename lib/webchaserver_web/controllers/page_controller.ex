defmodule WebchaserverWeb.PageController do
  use WebchaserverWeb, :controller
  use Params

  alias Webchaserver.Userclients
  alias Webchaserver.Usermatchs
  alias Webchaserver.Matchresults

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    conn
    |> put_layout(html: false)
    |> render(:home)
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

  def gettoken(conn, _params) do
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
              first.subtopic
            end
        end

        Userclients.create_userclient(%{user_id: current_user.id, subtopic: subtopic})
        subtopic
      else
        user.subtopic
      end

    render(assign(conn, :user_token, token), :gettoken, layout: false, subtopic: subtopic)
  end

  defparams match_filter %{
    "page" => [field: :integer, default: 1],
    "character" => :string,
    "result" => :string,
    "date" => :utc_datetime
  }

  def mymatch(conn, params \\ %{}) do
    month_format = %{1 => "Jan", 2 => "Feb", 3 => "Mar", 4 => "Apr", 5 => "May", 6 => "Jun", 7 => "Jul", 8 => "Aug", 9 => "Sep", 10 => "Oct", 11 => "Nov", 12 => "Dec"}
    enemy_format = %{"cool" => "hot", "hot" => "cool"}

    changeset = match_filter(params)
    filter = if changeset.valid? do
      Params.data changeset
    else
      match_filter(%{}).data
    end

    page = filter.page

    page = if page < 1 do
      1
    else
      page
    end

    character = case filter.character do
      "cool" ->
        filter.character
      "hot" ->
        filter.character
      _ ->
        nil
    end

    matchs = Usermatchs.list_usermatchs_by_user_id_is_end(conn.assigns[:current_user].id,%{player: character})

    date = filter.date

    results = matchs
    |> Enum.map(fn(match) ->
      player = match.player

      result = case filter.result do
        "win" ->
          player <> " " <> filter.result
        "lose" ->
          enemy_format[player] <> " win"
        "draw" ->
          filter.result
        _ ->
          nil
      end

      match_id = match.match_id
      case Matchresults.get_matchresult_by_match_id(match_id,%{result: result, inserted_at: date}) do
        nil ->
          nil
        matchresult ->
          jst = DateTime.from_naive!(matchresult.inserted_at, "Asia/Tokyo")
          date = "#{jst.year} #{month_format[jst.month]} #{jst.day} #{jst.hour |> Integer.to_string() |> String.pad_leading(2, "0")}:#{jst.minute |> Integer.to_string() |> String.pad_leading(2, "0")}"
          %{match_id: match_id, player: player, result: matchresult.result, date: date}
      end
    end)
    |> Enum.filter(fn(x) -> x != nil end)

    page_count = Enum.count(results) |> div(11) |> Kernel.+(1)

    render(conn, :mymatch, layout: false, results: results, page: page, page_count: page_count)
  end

  def viewmatch(conn, %{"match_id" => match_id}) do
    render(assign(assign(conn, :match_id, match_id), :is_view, "true"), :viewmatch, layout: false)
  end

  def creatematch(conn, _params) do
    render(conn, :creatematch, layout: false)
  end
end
