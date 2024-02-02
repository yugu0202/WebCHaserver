defmodule Webchaserver.Repo.Migrations.CreateLogs do
  use Ecto.Migration

  def change do
    create table(:logs) do
      add :match_id, :integer
      add :player, :string, size: 4
      add :action, :string
      add :map_data, {:array, {:array, :integer}}
      add :map_size, {:array, :integer}
      add :turn, :integer
      add :cool_pos, {:array, :integer}
      add :hot_pos, {:array, :integer}
      add :cool_score, :integer
      add :hot_score, :integer
      add :return, {:array, :integer}

      timestamps()
    end
  end
end
