defmodule Webchaserver.Repo.Migrations.CreateLogs do
  use Ecto.Migration

  def change do
    create table(:logs) do
      add :match_id, :integer
      add :player, :string, size: 4
      add :action, :string
      add :map_data, :string, size: 1024
      add :map_size, :string, size: 5
      add :cool_pos, :string, size: 5
      add :hot_pos, :string, size: 5
      add :return, {:array, :integer}

      timestamps()
    end
  end
end
