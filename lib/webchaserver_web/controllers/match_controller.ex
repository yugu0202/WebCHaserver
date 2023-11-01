defmodule WebchaserverWeb.MatchController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Matchs
  alias Webchaserver.Matchs.Match

  action_fallback WebchaserverWeb.FallbackController

  def index(conn, _params) do
    matchs = Matchs.list_matchs()
    render(conn, :index, matchs: matchs)
  end

  def create(conn, %{"match" => match_params}) do
    with {:ok, %Match{} = match} <- Matchs.create_match(match_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/matchs/#{match}")
      |> render(:show, match: match)
    end
  end

  def show(conn, %{"id" => id}) do
    match = Matchs.get_match!(id)
    render(conn, :show, match: match)
  end

  def update(conn, %{"id" => id, "match" => match_params}) do
    match = Matchs.get_match!(id)

    with {:ok, %Match{} = match} <- Matchs.update_match(match, match_params) do
      render(conn, :show, match: match)
    end
  end

  def delete(conn, %{"id" => id}) do
    match = Matchs.get_match!(id)

    with {:ok, %Match{}} <- Matchs.delete_match(match) do
      send_resp(conn, :no_content, "")
    end
  end
end
