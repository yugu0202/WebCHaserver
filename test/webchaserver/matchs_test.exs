defmodule Webchaserver.MatchsTest do
  use Webchaserver.DataCase

  alias Webchaserver.Matchs

  describe "matchs" do
    alias Webchaserver.Matchs.Match

    import Webchaserver.MatchsFixtures

    @invalid_attrs %{cool_pos: nil, hot_pos: nil, map: nil}

    test "list_matchs/0 returns all matchs" do
      match = match_fixture()
      assert Matchs.list_matchs() == [match]
    end

    test "get_match!/1 returns the match with given id" do
      match = match_fixture()
      assert Matchs.get_match!(match.id) == match
    end

    test "create_match/1 with valid data creates a match" do
      valid_attrs = %{cool_pos: "some cool_pos", hot_pos: "some hot_pos", id: 42, map: "some map"}

      assert {:ok, %Match{} = match} = Matchs.create_match(valid_attrs)
      assert match.cool_pos == "some cool_pos"
      assert match.hot_pos == "some hot_pos"
      assert match.id == 42
      assert match.map == "some map"
    end

    test "create_match/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Matchs.create_match(@invalid_attrs)
    end

    test "update_match/2 with valid data updates the match" do
      match = match_fixture()

      update_attrs = %{
        cool_pos: "some updated cool_pos",
        hot_pos: "some updated hot_pos",
        id: 43,
        map: "some updated map"
      }

      assert {:ok, %Match{} = match} = Matchs.update_match(match, update_attrs)
      assert match.cool_pos == "some updated cool_pos"
      assert match.hot_pos == "some updated hot_pos"
      assert match.id == 43
      assert match.map == "some updated map"
    end

    test "update_match/2 with invalid data returns error changeset" do
      match = match_fixture()
      assert {:error, %Ecto.Changeset{}} = Matchs.update_match(match, @invalid_attrs)
      assert match == Matchs.get_match!(match.id)
    end

    test "delete_match/1 deletes the match" do
      match = match_fixture()
      assert {:ok, %Match{}} = Matchs.delete_match(match)
      assert_raise Ecto.NoResultsError, fn -> Matchs.get_match!(match.id) end
    end

    test "change_match/1 returns a match changeset" do
      match = match_fixture()
      assert %Ecto.Changeset{} = Matchs.change_match(match)
    end
  end
end
