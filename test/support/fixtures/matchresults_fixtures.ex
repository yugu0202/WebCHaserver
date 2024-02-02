defmodule Webchaserver.MatchresultsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Webchaserver.Matchresults` context.
  """

  @doc """
  Generate a matchresult.
  """
  def matchresult_fixture(attrs \\ %{}) do
    {:ok, matchresult} =
      attrs
      |> Enum.into(%{
        cool_score: 42,
        hot_score: 42,
        match_id: 42,
        reason: "some reason",
        result: "some result"
      })
      |> Webchaserver.Matchresults.create_matchresult()

    matchresult
  end
end
