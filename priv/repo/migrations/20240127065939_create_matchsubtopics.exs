defmodule Webchaserver.Repo.Migrations.CreateMatchsubtopics do
  use Ecto.Migration

  def change do
    create table(:matchsubtopics) do
      add :match_id, :integer
      add :subtopic, :string
      add :is_active, :boolean, default: false, null: false

      timestamps()
    end
  end
end
