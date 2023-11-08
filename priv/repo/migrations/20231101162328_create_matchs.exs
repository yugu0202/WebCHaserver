defmodule Webchaserver.Repo.Migrations.CreateMatchs do
  use Ecto.Migration

  def change do
    create table(:matchs) do
      add(:map, :string)
      add(:cool_pos, :string)
      add(:hot_pos, :string)

      timestamps()
    end
  end
end
