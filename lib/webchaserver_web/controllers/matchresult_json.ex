defmodule WebchaserverWeb.MatchresultJSON do
  alias Webchaserver.Matchresults.Matchresult

  @doc """
  Renders a single matchresult.
  """
  def show(%{matchresult: matchresult}) do
    %{data: data(matchresult)}
  end

  defp data(%Matchresult{} = matchresult) do
    %{
      result: matchresult.result,
      reason: matchresult.reason,
    }
  end
end
