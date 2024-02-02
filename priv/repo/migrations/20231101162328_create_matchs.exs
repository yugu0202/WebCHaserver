defmodule Webchaserver.Repo.Migrations.CreateMatchs do
  use Ecto.Migration

  def change do
    create table(:matchs) do
      add :map, {:array, {:array, :integer}}
      add :cool_pos, {:array, :integer}
      add :hot_pos, {:array, :integer}
      add :size, {:array, :integer}
      add :turn, :integer

      timestamps()
    end
  end
end
