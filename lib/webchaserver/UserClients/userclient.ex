defmodule Webchaserver.Userclients.Userclient do
  use Ecto.Schema
  import Ecto.Changeset

  schema "userclient" do
    field :user_id, :integer
    field :subtopic, :string

    timestamps()
  end

  @doc false
  def changeset(userclient, attrs) do
    userclient
    |> cast(attrs, [:user_id, :subtopic])
    |> validate_required([:user_id, :subtopic])
  end
end
