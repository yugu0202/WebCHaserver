defmodule Webchaserver.Userclients do
  @moduledoc """
  The Matchs context.
  """

  import Ecto.Query, warn: false
  alias Webchaserver.Repo

  alias Webchaserver.Userclients.Userclient

  @doc """
  Returns the list of matchs.
  
  ## Examples
  
      iex> list_matchs()
      [%Match{}, ...]
  
  """
  def list_data do
    Repo.all(Userclient)
  end

  @doc """
  Gets a single match.
  
  Raises `Ecto.NoResultsError` if the Match does not exist.
  
  ## Examples
  
      iex> get_match!(123)
      %Match{}
  
      iex> get_match!(456)
      ** (Ecto.NoResultsError)
  
  """
  def get_data!(id), do: Repo.get!(Userclient, id)

  def get_data_by_user_id!(user_id), do: Repo.get_by!(Userclient, user_id: user_id)

  @doc """
  Creates a match.
  
  ## Examples
  
      iex> create_match(%{field: value})
      {:ok, %Match{}}
  
      iex> create_match(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  
  """
  def create_data(attrs \\ %{}) do
    %Userclient{}
    |> Userclient.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a match.
  
  ## Examples
  
      iex> update_match(match, %{field: new_value})
      {:ok, %Match{}}
  
      iex> update_match(match, %{field: bad_value})
      {:error, %Ecto.Changeset{}}
  
  """
  def update_data(%Userclient{} = match, attrs) do
    match
    |> Userclient.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a match.
  
  ## Examples
  
      iex> delete_match(match)
      {:ok, %Match{}}
  
      iex> delete_match(match)
      {:error, %Ecto.Changeset{}}
  
  """
  def delete_data(%Userclient{} = data) do
    Repo.delete(data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking match changes.
  
  ## Examples
  
      iex> change_match(match)
      %Ecto.Changeset{data: %Match{}}
  
  """
  def change_data(%Userclient{} = data, attrs \\ %{}) do
    Userclient.changeset(data, attrs)
  end
end
