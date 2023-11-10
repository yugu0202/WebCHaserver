defmodule Webchaserver.Repo.Migrations.CreateUserclient do
  use Ecto.Migration

  def change do
    create table(:userclient) do
      add(:user_id, :integer)
      add(:subtopic, :string)

      timestamps()
    end
  end
end
