defmodule Webchaserver.Repo.Migrations.CreateLogs do
  use Ecto.Migration

  def change do
    create table(:logs) do
      add :match_id, :integer
      add :player, :string
      add :action, :string
      add :return, {:array, :integer}

      timestamps()
    end
  end
end
