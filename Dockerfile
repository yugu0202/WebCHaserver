FROM elixir:latest

RUN apt -y update
RUN apt -y install vim

RUN mix local.hex
RUN yes | mix archive.install hex phx_new
COPY ./dev.exs config/dev.exs
