defmodule Webchaserver.Repo do
  use Ecto.Repo,
    otp_app: :webchaserver,
    adapter: Ecto.Adapters.Postgres
end
