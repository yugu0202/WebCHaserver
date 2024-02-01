defmodule Webchaserver.Matchsubtopics.Matchsubtopic do
  use Ecto.Schema
  import Ecto.Changeset

  schema "matchsubtopics" do
    field :is_active, :boolean, default: false
    field :match_id, :integer
    field :subtopic, :string

    timestamps()
  end

  @doc false
  def changeset(matchsubtopic, attrs) do
    matchsubtopic
    |> cast(attrs, [:match_id, :subtopic, :is_active])
    |> validate_required([:match_id, :subtopic, :is_active])
  end
end
