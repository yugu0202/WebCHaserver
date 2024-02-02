defmodule WebchaserverWeb.LogJSON do
  alias Webchaserver.Logs.Log

  @doc """
  Renders a list of logs.
  """
  def index(%{logs: logs}) do
    %{data: for(log <- logs, do: data(log))}
  end

  defp data(%Log{} = log) do
    %{
      id: log.id,
      map_data: log.map_data,
      map_size: log.map_size,
      cool_pos: log.cool_pos,
      hot_pos: log.hot_pos,
      cool_score: log.cool_score,
      hot_score: log.hot_score,
      turn: log.turn
    }
  end
end
