defmodule Webchaserver.Logs.Log do
  use Ecto.Schema
  import Ecto.Changeset

  schema "logs" do
    field :match_id, :integer
    field :player, :string
    field :action, :string
    field :return, {:array, :integer}
    field :map_data, :string
    field :map_size, :string
    field :cool_pos, :string
    field :hot_pos, :string
    field :cool_score, :integer
    field :hot_score, :integer

    timestamps()
  end

  @doc false
  def changeset(log, attrs) do
    log
    |> cast(attrs, [:match_id, :player, :action, :return, :map_data, :map_size, :cool_pos, :hot_pos, :cool_score, :hot_score])
    |> validate_required([:match_id, :player, :action, :return, :map_data, :map_size, :cool_pos, :hot_pos, :cool_score, :hot_score])
  end
end