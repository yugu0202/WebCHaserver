defmodule Webchaserver.Matchsystem do

  alias Webchaserver.Logs
  alias Webchaserver.Matchresults

  def action(match_id, player, action, log) do
    case act_check(player, action, log) do
      true -> command(match_id, player, action, log)
      false ->
        enemy = case player do
          "cool" -> "hot"
          "hot" -> "cool"
        end
        Matchresults.create_matchresult(%{match_id: match_id, result: "#{enemy} win", reason: "#{player} wrong action", cool_score: log.cool_score, hot_score: log.hot_score})
        {[0,0,0,0,0,0,0,0,0,0], true}
    end
  end

  def command(match_id, player, "walk" <> direction, log) do
    IO.puts "walk #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    %{map_data: map, map_size: size, turn: turn} = log
    turn = turn - 1

    {my_pos, enemy_pos, my_score, enemy_score} =
      case player do
        "cool" ->
          {log.cool_pos, log.hot_pos, log.cool_score, log.hot_score}
        "hot" ->
          {log.hot_pos, log.cool_pos, log.hot_score, log.cool_score}
      end

    IO.inspect(size)
    IO.inspect(map)
    IO.inspect(my_pos)
    IO.inspect(enemy_pos)

    after_pos = case direction do
      "up" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)-1]
      "right" -> [Enum.at(my_pos, 0)+1, Enum.at(my_pos, 1)]
      "left" -> [Enum.at(my_pos, 0)-1, Enum.at(my_pos, 1)]
      "down" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)+1]
    end

    {map, my_score} =
      if get_point(after_pos, map, hd(size), enemy_pos) == 3 do
        after_map = map
        |> set_point(after_pos, 0)
        |> set_point(my_pos, 2)

        {after_map, my_score + 1}
      else
        {map, my_score}
      end

    is_end =
      if get_point(after_pos, map, hd(size), enemy_pos) == 2 do
        enemy = case player do
          "cool" -> "hot"
          "hot" -> "cool"
        end
        Matchresults.create_matchresult(%{match_id: match_id, result: "#{enemy} win", reason: "#{player} bad walk", cool_score: my_score, hot_score: enemy_score})
        true
      else
        false
      end

    arround_data = get_arround(after_pos, map, hd(size), enemy_pos)

    is_end = if check_arround_block(after_pos, map) do
      enemy = if player == "cool", do: "hot", else: "cool"
      Matchresults.create_matchresult(%{match_id: match_id, result: "#{enemy} win", reason: "#{player} arround block", cool_score: my_score, hot_score: enemy_score})
      true
    else
      is_end
    end

    is_end =
    case player do
      "cool" ->
        Logs.create_log(%{match_id: match_id, player: player, action: "walk"<>direction, return: arround_data, map_data: map, map_size: size, turn: turn, cool_pos: after_pos, hot_pos: enemy_pos, cool_score: my_score, hot_score: enemy_score})
        if turn == 0 and not is_end do
          cond do
            my_score > enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "cool win", reason: "turn end", cool_score: my_score, hot_score: enemy_score})
            my_score < enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "hot win", reason: "turn end", cool_score: my_score, hot_score: enemy_score})
            my_score == enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "draw", reason: "turn end", cool_score: my_score, hot_score: enemy_score})
          end

          true
        else
          is_end
        end
      "hot" ->
        Logs.create_log(%{match_id: match_id, player: player, action: "walk"<>direction, return: arround_data, map_data: map, map_size: size, turn: turn, cool_pos: enemy_pos, hot_pos: after_pos, hot_score: my_score, cool_score: enemy_score})
        if turn == 0 and not is_end do
          cond do
            my_score > enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "hot win", reason: "turn end", cool_score: enemy_score, hot_score: my_score})
            my_score < enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "cool win", reason: "turn end", cool_score: enemy_score, hot_score: my_score})
            my_score == enemy_score -> Matchresults.create_matchresult(%{match_id: match_id, result: "draw", reason: "turn end", cool_score: enemy_score, hot_score: my_score})
          end

          true
        else
          is_end
        end
    end

    {[unless(is_end, do: 1, else: 0) | arround_data], is_end}
  end


  def command(match_id, player, "look" <> direction, log) do
    IO.puts "look #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    %{map_data: map, map_size: size} = log

    {my_pos, enemy_pos} =
      case player do
        "cool" ->
          {log.cool_pos, log.hot_pos}
        "hot" ->
          {log.hot_pos, log.cool_pos}
      end

    IO.inspect(size)
    IO.inspect(map)
    IO.inspect(my_pos)
    IO.inspect(enemy_pos)

    look_pos = case direction do
      "up" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)-2]
      "right" -> [Enum.at(my_pos, 0)+2, Enum.at(my_pos, 1)]
      "left" -> [Enum.at(my_pos, 0)-2, Enum.at(my_pos, 1)]
      "down" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)+2]
    end

    look_data = get_arround(look_pos, map, hd(size), enemy_pos)

    act_end(player, "look"<>direction, look_data, map, log)
  end


  def command(match_id, player, "search" <> direction, log) do
    IO.puts "search #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    %{map_data: map, map_size: size} = log

    {my_pos, enemy_pos} =
      case player do
        "cool" ->
          {log.cool_pos, log.hot_pos}
        "hot" ->
          {log.hot_pos, log.cool_pos}
      end

    IO.inspect(size)
    IO.inspect(map)
    IO.inspect(my_pos)
    IO.inspect(enemy_pos)

    search_data = search(my_pos, map, hd(size), enemy_pos, direction)

    act_end(player, "search"<>direction, search_data, map, log)
  end


  def command(match_id, player, "put" <> direction, log) do
    IO.puts "put #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    %{map_data: map, map_size: size} = log

    {my_pos, enemy_pos} =
      case player do
        "cool" ->
          {log.cool_pos, log.hot_pos}
        "hot" ->
          {log.hot_pos, log.cool_pos}
      end

    IO.inspect(size)
    IO.inspect(map)
    IO.inspect(my_pos)
    IO.inspect(enemy_pos)

    put_pos = case direction do
      "up" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)-1]
      "right" -> [Enum.at(my_pos, 0)+1, Enum.at(my_pos, 1)]
      "left" -> [Enum.at(my_pos, 0)-1, Enum.at(my_pos, 1)]
      "down" -> [Enum.at(my_pos, 0), Enum.at(my_pos, 1)+1]
    end

    map = set_point(map, put_pos, 2)

    is_end = if get_point(put_pos, map, hd(size), enemy_pos) == 1 do
      Matchresults.create_matchresult(%{match_id: match_id, result: "#{player} win", reason: "#{player} put", cool_score: log.cool_score, hot_score: log.hot_score})
      true
    else
      false
    end

    arround_data = get_arround(my_pos, map, hd(size), enemy_pos)

    act_end(player, "put"<>direction, arround_data, map, log, is_end)
  end

  def command(match_id, player, "getready", log) do
    IO.puts "getready"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    %{map_data: map, map_size: size} = log

    {my_pos, enemy_pos} =
      case player do
        "cool" ->
          {log.cool_pos, log.hot_pos}
        "hot" ->
          {log.hot_pos, log.cool_pos}
      end

    IO.inspect(size)
    IO.inspect(map)
    IO.inspect(my_pos)
    IO.inspect(enemy_pos)

    arround_data = get_arround(my_pos, map, hd(size), enemy_pos)

    act_end(player, "getready", arround_data, map, log)
  end

  def command(_, _, _, _) do
    IO.puts "command not found"
    [0,0,0,0,0,0,0,0,0,0]
  end

  def act_end(player,action,ret_data,map,log,is_end \\ false) do
    turn = log.turn - 1
    Logs.create_log(%{match_id: log.match_id, player: player, action: action, return: ret_data, map_data: map, map_size: log.map_size, turn: turn, cool_pos: log.cool_pos, hot_pos: log.hot_pos, cool_score: log.cool_score, hot_score: log.hot_score})

    is_end = if if(player == "cool", do: log.cool_pos, else: log.hot_pos) |> check_arround_block(map) do
      enemy = if player == "cool", do: "hot", else: "cool"
      Matchresults.create_matchresult(%{match_id: log.match_id, result: "#{enemy} win", reason: "#{player} arround block", cool_score: log.cool_score, hot_score: log.hot_score})
      true
    else
      is_end
    end

    is_end =
    if turn == 0 and not is_end do
      cond do
        log.cool_score > log.hot_score -> Matchresults.create_matchresult(%{match_id: log.match_id, result: "cool win", reason: "turn end", cool_score: log.cool_score, hot_score: log.hot_score})
        log.cool_score < log.hot_score -> Matchresults.create_matchresult(%{match_id: log.match_id, result: "hot win", reason: "turn end", cool_score: log.cool_score, hot_score: log.hot_score})
        log.cool_score == log.hot_score -> Matchresults.create_matchresult(%{match_id: log.match_id, result: "draw", reason: "turn end", cool_score: log.cool_score, hot_score: log.hot_score})
      end
      true
    else
      is_end
    end

    {[unless(is_end, do: 1, else: 0) | ret_data], is_end}
  end

  def get_arround(pos, map, sizex, enemy_pos) do
    [x, y] = pos
    [get_point([x-1, y-1], map, sizex, enemy_pos), get_point([x, y-1], map, sizex, enemy_pos), get_point([x+1, y-1], map, sizex, enemy_pos),
    get_point([x-1, y], map, sizex, enemy_pos), get_point([x, y], map, sizex, enemy_pos), get_point([x+1, y], map, sizex, enemy_pos),
    get_point([x-1, y+1], map, sizex, enemy_pos), get_point([x, y+1], map, sizex, enemy_pos), get_point([x+1, y+1], map, sizex, enemy_pos)]
  end

  def search(pos, map, sizex, enemy_pos, direction) do
    [x, y] = pos

    [dx, dy] = case direction do
      "up" -> [0, -1]
      "right" -> [1, 0]
      "left" -> [-1, 0]
      "down" -> [0, 1]
    end

    Enum.map(1..9, fn(i) -> get_point([x+dx*i, y+dy*i], map, sizex, enemy_pos) end)
  end

  def get_point(pos, map, sizex, enemy_pos) do
    [x, y] = pos
    [ex, ey] = enemy_pos

    default = Enum.map(1..sizex, fn(_) -> 2 end)
    cond do
      x < 0 or y < 0 -> 2
      x == ex and y == ey -> 1
      true -> Enum.at(Enum.at(map, y, default), x, 2)
    end
  end

  def set_point(map, pos, value) do
    [x, y] = pos

    if x < 0 or y < 0 do
      map
    else
      List.replace_at(map, y, List.replace_at(Enum.at(map, y), x, value))
    end
  end

  def check_arround_block(pos, map) do
    [x, y] = pos
    if Enum.all?([Enum.at(Enum.at(map, y-1), x), Enum.at(Enum.at(map, y+1), x), Enum.at(Enum.at(map, y), x-1), Enum.at(Enum.at(map, y), x+1)], fn(x) -> x == 2 end) do
      true
    else
      false
    end
  end

  def act_check(player, action, log) do
    before_action = log.action
    before_player = log.player

    cond do
      before_action == "matching" and player == "cool" and action == "getready" -> true
      before_action == "matching" and player == "hot" -> false

      player == before_player and before_action == "getready" and action != "getready" -> true
      player != before_player and before_action != "getready" and action == "getready" -> true

      true -> false
    end
  end
end
