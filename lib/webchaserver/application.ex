defmodule Webchaserver.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      WebchaserverWeb.Telemetry,
      # Start the Ecto repository
      Webchaserver.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Webchaserver.PubSub},
      # Start Finch
      {Finch, name: Webchaserver.Finch},
      # Start the Endpoint (http/https)
      WebchaserverWeb.Endpoint
      # Start a worker by calling: Webchaserver.Worker.start_link(arg)
      # {Webchaserver.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Webchaserver.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    WebchaserverWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
