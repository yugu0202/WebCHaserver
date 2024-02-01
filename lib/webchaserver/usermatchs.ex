defmodule Webchaserver.Usermatchs do
  @moduledoc """
  The Usermatchs context.
  """

  import Ecto.Query, warn: false
  alias Webchaserver.Repo

  alias Webchaserver.Usermatchs.Usermatch

  @doc """
  Returns the list of usermatchs.

  ## Examples

      iex> list_usermatchs()
      [%Usermatch{}, ...]

  """
  def list_usermatchs do
    Repo.all(Usermatch)
  end

  def list_usermatchs_by_user_id(user_id) do
    Repo.all(from u in Usermatch, where: u.user_id == ^user_id, order_by: [asc: u.id])
  end

  @doc """
  Gets a single usermatch.

  Raises `Ecto.NoResultsError` if the Usermatch does not exist.

  ## Examples

      iex> get_usermatch!(123)
      %Usermatch{}

      iex> get_usermatch!(456)
      ** (Ecto.NoResultsError)

  """
  def get_usermatch!(id), do: Repo.get!(Usermatch, id)

  def get_usermatch_by_user_id_not_end(user_id) do
    Repo.one(from u in Usermatch, where: u.user_id == ^user_id and not u.is_end, order_by: [desc: u.id])
  end

  def exist_usermatch_by_user_id_not_end(user_id) do
    Repo.exists?(from u in Usermatch, where: u.user_id == ^user_id and not u.is_end, order_by: [desc: u.id])
  end

  @doc """
  Creates a usermatch.

  ## Examples

      iex> create_usermatch(%{field: value})
      {:ok, %Usermatch{}}

      iex> create_usermatch(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_usermatch(attrs \\ %{}) do
    %Usermatch{}
    |> Usermatch.changeset(attrs)
    |> Repo.insert()
  end

  def create_usermatch2(attrs \\ %{}, attr2 \\ %{}) do
    %Usermatch{}
    |> Usermatch.changeset(attrs)
    |> Repo.insert()

    %Usermatch{}
    |> Usermatch.changeset(attr2)
    |> Repo.insert()
  end

  @doc """
  Updates a usermatch.

  ## Examples

      iex> update_usermatch(usermatch, %{field: new_value})
      {:ok, %Usermatch{}}

      iex> update_usermatch(usermatch, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_usermatch(%Usermatch{} = usermatch, attrs) do
    %Usermatch{}
    |> Usermatch.changeset(attrs)
    |> Repo.update()
  end

  def update_usermatch_end(id) do
    get_usermatch!(id)
    |> Usermatch.changeset(%{is_end: true})
    |> Repo.update()
  end

  @doc """
  Deletes a usermatch.

  ## Examples

      iex> delete_usermatch(usermatch)
      {:ok, %Usermatch{}}

      iex> delete_usermatch(usermatch)
      {:error, %Ecto.Changeset{}}

  """
  def delete_usermatch(%Usermatch{} = usermatch) do
    Repo.delete(usermatch)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking usermatch changes.

  ## Examples

      iex> change_usermatch(usermatch)
      %Ecto.Changeset{data: %Usermatch{}}

  """
  def change_usermatch(%Usermatch{} = usermatch, attrs \\ %{}) do
    Usermatch.changeset(usermatch, attrs)
  end
end
