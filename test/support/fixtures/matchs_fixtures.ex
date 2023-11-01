defmodule Webchaserver.MatchsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Webchaserver.Matchs` context.
  """

  @doc """
  Generate a match.
  """
  def match_fixture(attrs \\ %{}) do
    {:ok, match} =
      attrs
      |> Enum.into(%{
        cool_pos: "some cool_pos",
        hot_pos: "some hot_pos",
        id: 42,
        map: "some map"
      })
      |> Webchaserver.Matchs.create_match()

    match
  end
end
