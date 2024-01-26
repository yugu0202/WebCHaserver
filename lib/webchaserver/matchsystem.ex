defmodule Webchaserver.Matchsystem do

  def command(match_id, player,"walk" <> direction) do
    IO.puts "walk #{direction}"
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

  def command("look" <> direction) do
    IO.puts "look #{direction}"
    case direction do
      "up" -> [0,0,0,0,0,0,0,0,0,0]
      "right" -> [0,0,0,0,0,0,0,0,0,0]
      "left" -> [0,0,0,0,0,0,0,0,0,0]
      "down" -> [0,0,0,0,0,0,0,0,0,0]
      _ -> [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command("search" <> direction) do
    IO.puts "search #{direction}"
    case direction do
      "up" -> [0,0,0,0,0,0,0,0,0,0]
      "right" -> [0,0,0,0,0,0,0,0,0,0]
      "left" -> [0,0,0,0,0,0,0,0,0,0]
      "down" -> [0,0,0,0,0,0,0,0,0,0]
      _ -> [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command("put" <> direction) do
    IO.puts "put #{direction}"
    case direction do
      "up" -> [0,0,0,0,0,0,0,0,0,0]
      "right" -> [0,0,0,0,0,0,0,0,0,0]
      "left" -> [0,0,0,0,0,0,0,0,0,0]
      "down" -> [0,0,0,0,0,0,0,0,0,0]
      _ -> [0,0,0,0,0,0,0,0,0,0]
    end
  end

  def command("getready") do
    IO.puts "getready"
    [0,0,0,0,0,0,0,0,0,0]
  end

  def command(_) do
    [0,0,0,0,0,0,0,0,0,0]
  end

end
