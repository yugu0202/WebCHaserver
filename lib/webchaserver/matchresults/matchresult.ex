defmodule Webchaserver.Matchresults.Matchresult do
  use Ecto.Schema
  import Ecto.Changeset

  schema "matchresults" do
    field :cool_score, :integer
    field :hot_score, :integer
    field :match_id, :integer
    field :reason, :string
    field :result, :string

    timestamps()
  end

  @doc false
  def changeset(matchresult, attrs) do
    matchresult
    |> cast(attrs, [:match_id, :result, :reason, :cool_score, :hot_score])
    |> validate_required([:match_id, :result, :reason, :cool_score, :hot_score])
  end
end
