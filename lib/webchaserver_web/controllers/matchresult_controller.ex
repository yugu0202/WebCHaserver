defmodule WebchaserverWeb.MatchresultController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Matchresults

  action_fallback(WebchaserverWeb.FallbackController)

  def show(conn, %{"match_id" => match_id}) do
    matchresult = Matchresults.get_matchresult_by_match_id(match_id)
    render(conn, :show, matchresult: matchresult)
  end
end
