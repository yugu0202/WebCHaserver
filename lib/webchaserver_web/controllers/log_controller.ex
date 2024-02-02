defmodule WebchaserverWeb.LogController do
  use WebchaserverWeb, :controller

  alias Webchaserver.Logs

  action_fallback(WebchaserverWeb.FallbackController)

  def index(conn, %{"match_id" => match_id}) do
    logs = Logs.list_logs_by_match_id(match_id)
    render(conn, :index, logs: logs)
  end
end
