defmodule Webchaserver.Matchsystem do

  def command(match_id, player, "walk" <> direction, log) do
    IO.puts "walk #{direction}"
    IO.puts "match_id: #{match_id}"
    IO.puts "player: #{player}"

    {map_data, pos} = case player do
      "cool" ->
        %{map_data: map_data, cool_pos: pos} = log
        {map_data, pos}
      "hot" ->
        %{map_data: map_data, hot_pos: pos} = log
        {map_data, pos}
    end

    map = map_data
    |> String.split("\n")
    |> Enum.map(&String.split(&1, ","))

    IO.inspect(map)

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

  def command(match_id, player, "look" <> direction) do
    IO.puts "look #{direction}"
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

  def command(_, _, _) do
    IO.puts "command not found"
    [0,0,0,0,0,0,0,0,0,0]
  end

end
