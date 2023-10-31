defmodule Webchaserver.Client do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clients" do
    field :cool_pos, :string
    field :hot_pos, :string
    field :map, :string
    field :match_id, :integer

    timestamps()
  end

  @doc false
  def changeset(client, attrs) do
    client
    |> cast(attrs, [:match_id, :map, :cool_pos, :hot_pos])
    |> validate_required([:match_id, :map, :cool_pos, :hot_pos])
  end
end