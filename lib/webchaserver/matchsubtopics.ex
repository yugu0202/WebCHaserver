defmodule Webchaserver.Matchsubtopics do
  @moduledoc """
  The Matchsubtopics context.
  """

  import Ecto.Query, warn: false
  alias Webchaserver.Repo

  alias Webchaserver.Matchsubtopics.Matchsubtopic

  @doc """
  Returns the list of matchsubtopics.

  ## Examples

      iex> list_matchsubtopics()
      [%Matchsubtopic{}, ...]

  """
  def list_matchsubtopics do
    Repo.all(Matchsubtopic)
  end

  @doc """
  Gets a single matchsubtopic.

  Raises `Ecto.NoResultsError` if the Matchsubtopic does not exist.

  ## Examples

      iex> get_matchsubtopic!(123)
      %Matchsubtopic{}

      iex> get_matchsubtopic!(456)
      ** (Ecto.NoResultsError)

  """
  def get_matchsubtopic!(id), do: Repo.get!(Matchsubtopic, id)

  def get_matchsubtopic_by_subtopic_is_active(subtopic) do
    Repo.get_by(Matchsubtopic, subtopic: subtopic, is_active: true)
  end

  @doc """
  Creates a matchsubtopic.

  ## Examples

      iex> create_matchsubtopic(%{field: value})
      {:ok, %Matchsubtopic{}}

      iex> create_matchsubtopic(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_matchsubtopic(attrs \\ %{}) do
    %Matchsubtopic{}
    |> Matchsubtopic.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a matchsubtopic.

  ## Examples

      iex> update_matchsubtopic(matchsubtopic, %{field: new_value})
      {:ok, %Matchsubtopic{}}

      iex> update_matchsubtopic(matchsubtopic, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_matchsubtopic(%Matchsubtopic{} = matchsubtopic, attrs) do
    matchsubtopic
    |> Matchsubtopic.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a matchsubtopic.

  ## Examples

      iex> delete_matchsubtopic(matchsubtopic)
      {:ok, %Matchsubtopic{}}

      iex> delete_matchsubtopic(matchsubtopic)
      {:error, %Ecto.Changeset{}}

  """
  def delete_matchsubtopic(%Matchsubtopic{} = matchsubtopic) do
    Repo.delete(matchsubtopic)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking matchsubtopic changes.

  ## Examples

      iex> change_matchsubtopic(matchsubtopic)
      %Ecto.Changeset{data: %Matchsubtopic{}}

  """
  def change_matchsubtopic(%Matchsubtopic{} = matchsubtopic, attrs \\ %{}) do
    Matchsubtopic.changeset(matchsubtopic, attrs)
  end
end
