defmodule Webchaserver.Repo.Migrations.CreateMatchresults do
  use Ecto.Migration

  def change do
    create table(:matchresults) do
      add :match_id, :integer
      add :result, :string
      add :reason, :string
      add :cool_score, :integer
      add :hot_score, :integer

      timestamps()
    end
  end
end
