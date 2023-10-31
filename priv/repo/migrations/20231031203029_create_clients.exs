defmodule Webchaserver.Repo.Migrations.CreateClients do
  use Ecto.Migration

  def change do
    create table(:clients) do
      add :match_id, :integer
      add :map, :string
      add :cool_pos, :string
      add :hot_pos, :string

      timestamps()
    end
  end
end
