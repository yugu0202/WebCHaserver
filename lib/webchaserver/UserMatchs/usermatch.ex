defmodule Webchaserver.Usermatchs.Usermatch do
  use Ecto.Schema
  import Ecto.Changeset

  schema "usermatchs" do
    field :match_id, :integer
    field :user_id, :integer
    field :player, :string
    field :is_end, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(usermatch, attrs) do
    usermatch
    |> cast(attrs, [:user_id, :match_id, :player, :is_end])
    |> validate_required([:user_id, :match_id, :player, :is_end])
  end
end
