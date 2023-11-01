defmodule WebchaserverWeb.MatchControllerTest do
  use WebchaserverWeb.ConnCase

  import Webchaserver.MatchsFixtures

  alias Webchaserver.Matchs.Match

  @create_attrs %{
    cool_pos: "some cool_pos",
    hot_pos: "some hot_pos",
    id: 42,
    map: "some map"
  }
  @update_attrs %{
    cool_pos: "some updated cool_pos",
    hot_pos: "some updated hot_pos",
    id: 43,
    map: "some updated map"
  }
  @invalid_attrs %{cool_pos: nil, hot_pos: nil, id: nil, map: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all matchs", %{conn: conn} do
      conn = get(conn, ~p"/api/matchs")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create match" do
    test "renders match when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/matchs", match: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/matchs/#{id}")

      assert %{
               "id" => ^id,
               "cool_pos" => "some cool_pos",
               "hot_pos" => "some hot_pos",
               "id" => 42,
               "map" => "some map"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/matchs", match: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update match" do
    setup [:create_match]

    test "renders match when data is valid", %{conn: conn, match: %Match{id: id} = match} do
      conn = put(conn, ~p"/api/matchs/#{match}", match: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/matchs/#{id}")

      assert %{
               "id" => ^id,
               "cool_pos" => "some updated cool_pos",
               "hot_pos" => "some updated hot_pos",
               "id" => 43,
               "map" => "some updated map"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, match: match} do
      conn = put(conn, ~p"/api/matchs/#{match}", match: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete match" do
    setup [:create_match]

    test "deletes chosen match", %{conn: conn, match: match} do
      conn = delete(conn, ~p"/api/matchs/#{match}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/matchs/#{match}")
      end
    end
  end

  defp create_match(_) do
    match = match_fixture()
    %{match: match}
  end
end
