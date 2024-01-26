defmodule Webchaserver.Logs.Log do
  use Ecto.Schema
  import Ecto.Changeset

  schema "logs" do
    field :action, :string
    field :match_id, :integer
    field :player, :string
    field :return, {:array, :integer}

    timestamps()
  end

  @doc false
  def changeset(log, attrs) do
    log
    |> cast(attrs, [:match_id, :player, :action, :return])
    |> validate_required([:match_id, :player, :action, :return])
  end
end
