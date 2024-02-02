defmodule Webchaserver.Userclients do
  @moduledoc """
  The Userclients context.
  """

  import Ecto.Query, warn: false
  alias Webchaserver.Repo

  alias Webchaserver.Userclients.Userclient

  @doc """
  Returns the list of userclients.

  ## Examples

      iex> list_userclients()
      [%Userclient{}, ...]

  """
  def list_userclients do
    Repo.all(Userclient)
  end

  @doc """
  Gets a single userclient.

  Raises `Ecto.NoResultsError` if the Userclient does not exist.

  ## Examples

      iex> get_userclient!(123)
      %Userclient{}

      iex> get_userclient!(456)
      ** (Ecto.NoResultsError)

  """
  def get_userclient!(id), do: Repo.get!(Userclient, id)

  @doc """
  Gets a single userclient by user_id.

  Raises `Ecto.NoResultsError` if the Userclient does not exist.

  ## Examples

      iex> get_userclient!(123)
      %Userclient{}

      iex> get_userclient!(456)
      ** (Ecto.NoResultsError)

  """
  def get_userclient_by_user_id(user_id), do: Repo.get_by(Userclient, user_id: user_id)

  def get_userclient_latest2() do
    Repo.all(from u in Userclient, order_by: [asc: u.id], limit: 2)
  end

  def get_userclient_by_subtopic(subtopic) do
    Repo.one(from u in Userclient, where: ^subtopic == u.subtopic, order_by: [asc: u.id], limit: 1)
  end

  @doc """
  Creates a userclient.

  ## Examples

      iex> create_userclient(%{field: value})
      {:ok, %Userclient{}}

      iex> create_userclient(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_userclient(attrs \\ %{}) do
    %Userclient{}
    |> Userclient.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a userclient.

  ## Examples

      iex> update_userclient(userclient, %{field: new_value})
      {:ok, %Userclient{}}

      iex> update_userclient(userclient, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_userclient(%Userclient{} = userclient, attrs) do
    userclient
    |> Userclient.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a userclient.

  ## Examples

      iex> delete_userclient(userclient)
      {:ok, %Userclient{}}

      iex> delete_userclient(userclient)
      {:error, %Ecto.Changeset{}}

  """
  def delete_userclient(%Userclient{} = userclient) do
    Repo.delete(userclient)
  end

  def delete_userclient_by_subtopic(subtopic) do
    Repo.delete_all(from u in Userclient, where: u.subtopic == ^subtopic)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking userclient changes.

  ## Examples

      iex> change_userclient(userclient)
      %Ecto.Changeset{data: %Userclient{}}

  """
  def change_userclient(%Userclient{} = userclient, attrs \\ %{}) do
    Userclient.changeset(userclient, attrs)
  end
end
