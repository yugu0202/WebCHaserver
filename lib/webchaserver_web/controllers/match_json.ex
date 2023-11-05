defmodule WebchaserverWeb.MatchJSON do
  alias Webchaserver.Matchs.Match

  @doc """
  Renders a list of matchs.
  """
  def index(%{matchs: matchs}) do
    %{data: for(match <- matchs, do: data(match))}
  end

  @doc """
  Renders a single match.
  """
  def show(%{match: match}) do
    %{data: data(match)}
  end

  defp data(%Match{} = match) do
    %{
      id: match.id,
      match_id: match.match_id,
      map: match.map,
      cool_pos: match.cool_pos,
      hot_pos: match.hot_pos
    }
  end
end
