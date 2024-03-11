defmodule Webchaserver.Repo.Migrations.AddUserclientLocked do
  use Ecto.Migration

  def change do
    alter table(:userclient) do
      add :locked, :boolean
    end
  end
end
