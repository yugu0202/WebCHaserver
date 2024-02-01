defmodule Webchaserver.Matchsystem do

  alias Webchaserver.Logs
  alias Webchaserver.Logs.Log

  def command(match_id, player, "walk" <> direction, log) do
    IO.puts "walk #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    {my_pos_data, enemy_pos_data, score} = case player do
      "cool" ->
        %{cool_pos: my_pos, hot_pos: enemy_pos, cool_score: score} = log
        {my_pos, enemy_pos, score}
      "hot" ->
        %{cool_pos: enemy_pos, hot_pos: my_pos, hot_score: score} = log
        {my_pos, enemy_pos, score}
    end

    %{map_data: map_data, map_size: map_size} = log

    map = map_data
    |> String.split("\n")
    |> Enum.map(&String.split(&1, ","))

    IO.inspect(map)

    size = map_size
    |> String.split("x")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(size)

    my_pos = my_pos_data
    |> String.split(",")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(my_pos)

    enemy_pos = enemy_pos_data
    |> String.split(",")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(enemy_pos)

    after_pos = case direction do
      "up" ->
        [x, y] = my_pos
        [x, y-1]
      "right" ->
        [x, y] = my_pos
        [x+1, y]
      "left" ->
        [x, y] = my_pos
        [x-1, y]
      "down" ->
        [x, y] = my_pos
        [x, y+1]
    end

    {map, score} =
    if get_point(after_pos, map, hd(size), enemy_pos) == "3" do
      map = set_point(after_pos, map, "0")
      {set_point(my_pos, map, "2"), score + 1}
    else
      {map, score}
    end

    is_end = if get_point(after_pos, map, hd(size), enemy_pos) == "2", do: true, else: false

    arround_data = get_arround(after_pos, map, hd(size), enemy_pos)

    map_data = map_to_string(map)
    my_pos_data = pos_to_string(after_pos)

    case player do
      "cool" ->
        IO.puts "cool"
        {:ok, hot_score} = Map.fetch(log, :hot_score)
        Logs.create_log(%{match_id: match_id, player: player, action: "walk" <> direction, return: arround_data, map_data: map_data, map_size: map_size, cool_pos: my_pos_data, hot_pos: enemy_pos_data,cool_score: score, hot_score: hot_score})
      "hot" ->
        IO.puts "hot"
        {:ok, cool_score} = Map.fetch(log, :cool_score)
        Logs.create_log(%{match_id: match_id, player: player, action: "walk" <> direction, return: arround_data, map_data: map_data, map_size: map_size, cool_pos: enemy_pos_data, hot_pos: my_pos_data, hot_score: score, cool_score: cool_score})
    end

    {["1" | arround_data], is_end}
  end

  def command(match_id, player, "look" <> direction, log) do
    IO.puts "look #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    {my_pos_data, enemy_pos_data} = case player do
      "cool" ->
        %{cool_pos: my_pos, hot_pos: enemy_pos} = log
        {my_pos, enemy_pos}
      "hot" ->
        %{cool_pos: enemy_pos, hot_pos: my_pos} = log
        {my_pos, enemy_pos}
    end

    %{map_data: map_data, map_size: map_size} = log

    map = map_data
    |> String.split("\n")
    |> Enum.map(&String.split(&1, ","))

    IO.inspect(map)

    size = map_size
    |> String.split("x")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(size)

    my_pos = my_pos_data
    |> String.split(",")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(my_pos)

    enemy_pos = enemy_pos_data
    |> String.split(",")
    |> Enum.map(&String.to_integer(&1))

    IO.inspect(enemy_pos)

    case direction do
      "up" ->
        [0,0,0,0,0,0,0,0,0,0]
      "right" ->
        [0,0,0,0,0,0,0,0,0,0]
      "left" ->
        [0,0,0,0,0,0,0,0,0,0]
      "down" ->
        [0,0,0,0,0,0,0,0,0,0]
      _ ->
        [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command(match_id, player, "search" <> direction) do
    IO.puts "search #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    case direction do
      "up" ->
        [0,0,0,0,0,0,0,0,0,0]
      "right" ->
        [0,0,0,0,0,0,0,0,0,0]
      "left" ->
        [0,0,0,0,0,0,0,0,0,0]
      "down" ->
        [0,0,0,0,0,0,0,0,0,0]
      _ ->
        [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command(match_id, player, "put" <> direction) do
    IO.puts "put #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    case direction do
      "up" ->
        [0,0,0,0,0,0,0,0,0,0]
      "right" ->
        [0,0,0,0,0,0,0,0,0,0]
      "left" ->
        [0,0,0,0,0,0,0,0,0,0]
      "down" ->
        [0,0,0,0,0,0,0,0,0,0]
      _ ->
        [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command(match_id, player, "getready", log) do
    IO.puts "getready"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"
    %{}

    [0,0,0,0,0,0,0,0,0,0]
  end

  def command(_, _, _, _) do
    IO.puts "command not found"
    [0,0,0,0,0,0,0,0,0,0]
  end

  def get_arround(pos, map, sizex, enemy_pos) do
    [x, y] = pos
    [get_point([x-1, y-1], map, sizex, enemy_pos), get_point([x, y-1], map, sizex, enemy_pos), get_point([x+1, y-1], map, sizex, enemy_pos),
    get_point([x-1, y], map, sizex, enemy_pos), get_point([x, y], map, sizex, enemy_pos), get_point([x+1, y], map, sizex, enemy_pos),
    get_point([x-1, y+1], map, sizex, enemy_pos), get_point([x, y+1], map, sizex, enemy_pos), get_point([x+1, y+1], map, sizex, enemy_pos)]
  end

  def get_point(pos, map, sizex, enemy_pos) do
    [x, y] = pos
    [ex, ey] = enemy_pos

    default = Enum.map(1..sizex, fn(_) -> "2" end)
    cond do
      x < 0 or y < 0 -> "2"
      x == ex and y == ey -> "1"
      true -> Enum.at(Enum.at(map, y, default), x, "2")
    end
  end

  def set_point(pos, map, value) do
    [x, y] = pos

    if x < 0 or y < 0 do
      map
    else
      List.replace_at(map, y, List.replace_at(Enum.at(map, y), x, value))
    end
  end

  def pos_to_string(pos) do
    [x, y] = pos
    "#{x},#{y}"
  end

  def map_to_string(map) do
    map
    |> Enum.map(&Enum.join(&1, ","))
    |> Enum.join("\n")
  end
end
