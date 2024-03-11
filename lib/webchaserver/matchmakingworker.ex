defmodule Webchaserver.MatchMakingWorker do
  use Task

  alias Webchaserver.Userclients
  alias Webchaserver.Matchs
  alias Webchaserver.Usermatchs
  alias Webchaserver.Logs

  def start_link(args) do
    Task.start_link(__MODULE__, :loop, args)
  end

  def loop(args) do
    IO.puts "MatchMakingWorker loop"

    # Get oldest 1 userclient data
    userclient = Userclients.get_userclient_older_not_lock()

    # match making
    if userclient do
      Userclients.update_userclient(userclient, %{locked: true})
      userclient = Userclients.get_userclient!(userclient.id)
      IO.puts "Locked userclient: #{userclient.id}"

      # データに沿ってマッチングを行う(今回はとりあえず古いユーザーを優先)
      userclient2 = Userclients.get_userclient_older_not_lock()
      if userclient2 do
        IO.puts "userclient2: #{userclient2.id}"
        IO.puts "Matched userclient: #{userclient.id} and #{userclient2.id}"
        Userclients.delete_userclient(userclient)
        Userclients.delete_userclient(userclient2)

        # マッチの生成
        size = [15,17]
        turn = 100
        cool_pos = [0,0]
        hot_pos = [14,16]
        mapdata =
          "D:0,0,3,0,3,0,3,0,0,0,0,0,0,0,0
          D:3,2,2,0,2,2,0,2,0,2,2,2,0,2,0
          D:0,0,3,0,3,2,3,0,3,2,0,3,0,3,0
          D:0,2,0,2,0,2,0,2,0,0,0,2,2,2,0
          D:0,2,3,2,3,2,3,2,3,2,0,3,0,3,0
          D:0,2,0,2,0,2,0,2,0,0,0,2,2,2,0
          D:0,0,3,0,3,0,3,0,3,2,0,3,0,3,0
          D:0,2,2,0,2,0,2,2,0,2,0,2,0,2,0
          D:0,0,0,0,0,0,0,3,0,0,0,0,0,0,0
          D:0,2,0,2,0,2,0,2,2,0,2,0,2,2,0
          D:0,3,0,3,0,2,3,0,3,0,3,0,3,0,0
          D:0,2,2,2,0,0,0,2,0,2,0,2,0,2,0
          D:0,3,0,3,0,2,3,2,3,2,3,2,3,2,0
          D:0,2,2,2,0,0,0,2,0,2,0,2,0,2,0
          D:0,3,0,3,0,2,3,0,3,2,3,0,3,0,0
          D:0,2,0,2,2,2,0,2,0,2,2,0,2,2,3
          D:0,0,0,0,0,0,0,0,3,0,3,0,3,0,0"
          |> String.replace(["D:", " "], "") #とりあえずサンプルデータとして成形
          |> String.split("\r\n")
          |> Enum.map(&String.split(&1, ","))
          |> Enum.flat_map(&(&1))
          |> Enum.map(&String.to_integer(&1))
          |> Enum.chunk_every(Enum.at(size, 0))

        {:ok, %{id: id}} = Matchs.create_match(%{map: mapdata, cool_pos: cool_pos, hot_pos: hot_pos, size: size, turn: turn})
        Logs.create_log(%{match_id: id, player: "cool", action: "match", return: [], map_data: mapdata, map_size: size,turn: turn, cool_pos: cool_pos, hot_pos: hot_pos, cool_score: 0, hot_score: 0})

        Usermatchs.create_usermatch2(%{user_id: userclient.user_id, match_id: id, player: "cool"}, %{user_id: userclient2.user_id, match_id: id, player: "hot"})

        WebchaserverWeb.Endpoint.broadcast("client:#{userclient.user_id}", "match", %{subtopic: Integer.to_string(id)})
        WebchaserverWeb.Endpoint.broadcast("client:#{userclient2.user_id}", "match", %{subtopic: Integer.to_string(id)})
      else
        IO.puts "Not found"
        Userclients.update_userclient(userclient, %{locked: false})
      end
    end

    :timer.sleep(1000)
    loop(args)
  end
end
