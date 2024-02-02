defmodule Webchaserver.MatchresultsTest do
  use Webchaserver.DataCase

  alias Webchaserver.Matchresults

  describe "matchresults" do
    alias Webchaserver.Matchresults.Matchresult

    import Webchaserver.MatchresultsFixtures

    @invalid_attrs %{cool_score: nil, hot_score: nil, match_id: nil, reason: nil, result: nil}

    test "list_matchresults/0 returns all matchresults" do
      matchresult = matchresult_fixture()
      assert Matchresults.list_matchresults() == [matchresult]
    end

    test "get_matchresult!/1 returns the matchresult with given id" do
      matchresult = matchresult_fixture()
      assert Matchresults.get_matchresult!(matchresult.id) == matchresult
    end

    test "create_matchresult/1 with valid data creates a matchresult" do
      valid_attrs = %{cool_score: 42, hot_score: 42, match_id: 42, reason: "some reason", result: "some result"}

      assert {:ok, %Matchresult{} = matchresult} = Matchresults.create_matchresult(valid_attrs)
      assert matchresult.cool_score == 42
      assert matchresult.hot_score == 42
      assert matchresult.match_id == 42
      assert matchresult.reason == "some reason"
      assert matchresult.result == "some result"
    end

    test "create_matchresult/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Matchresults.create_matchresult(@invalid_attrs)
    end

    test "update_matchresult/2 with valid data updates the matchresult" do
      matchresult = matchresult_fixture()
      update_attrs = %{cool_score: 43, hot_score: 43, match_id: 43, reason: "some updated reason", result: "some updated result"}

      assert {:ok, %Matchresult{} = matchresult} = Matchresults.update_matchresult(matchresult, update_attrs)
      assert matchresult.cool_score == 43
      assert matchresult.hot_score == 43
      assert matchresult.match_id == 43
      assert matchresult.reason == "some updated reason"
      assert matchresult.result == "some updated result"
    end

    test "update_matchresult/2 with invalid data returns error changeset" do
      matchresult = matchresult_fixture()
      assert {:error, %Ecto.Changeset{}} = Matchresults.update_matchresult(matchresult, @invalid_attrs)
      assert matchresult == Matchresults.get_matchresult!(matchresult.id)
    end

    test "delete_matchresult/1 deletes the matchresult" do
      matchresult = matchresult_fixture()
      assert {:ok, %Matchresult{}} = Matchresults.delete_matchresult(matchresult)
      assert_raise Ecto.NoResultsError, fn -> Matchresults.get_matchresult!(matchresult.id) end
    end

    test "change_matchresult/1 returns a matchresult changeset" do
      matchresult = matchresult_fixture()
      assert %Ecto.Changeset{} = Matchresults.change_matchresult(matchresult)
    end
  end
end
