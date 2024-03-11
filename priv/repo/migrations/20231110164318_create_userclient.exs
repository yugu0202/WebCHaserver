defmodule Webchaserver.Repo.Migrations.CreateUserclient do
  use Ecto.Migration

  def change do
    create table(:userclient) do
      add(:user_id, :integer)
      add(:subtopic, :string)
      add(:locked, :boolean)

      timestamps()
    end
  end
end
