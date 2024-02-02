defmodule Webchaserver.Matchs.Match do
  use Ecto.Schema
  import Ecto.Changeset

  schema "matchs" do
    field :cool_pos, {:array, :integer}
    field :hot_pos, {:array, :integer}
    field :map, {:array, {:array, :integer}}
    field :size, {:array, :integer}
    field :turn, :integer

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [:map, :cool_pos, :hot_pos, :size, :turn])
    |> validate_required([:map, :cool_pos, :hot_pos, :size, :turn])
  end
end
