defmodule Webchaserver.Repo.Migrations.CreateMatchs do
  use Ecto.Migration

  def change do
    create table(:matchs) do
      add(:map, :string, size: 1024)
      add(:cool_pos, :string, size: 5)
      add(:hot_pos, :string, size: 5)
      add(:size, :string, size: 5)

      timestamps()
    end
  end
end
