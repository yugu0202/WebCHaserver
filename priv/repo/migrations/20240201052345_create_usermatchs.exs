defmodule Webchaserver.Repo.Migrations.CreateUsermatchs do
  use Ecto.Migration

  def change do
    create table(:usermatchs) do
      add :user_id, :integer
      add :match_id, :integer
      add :player, :string
      add :is_end, :boolean, default: false

      timestamps()
    end
  end
end
