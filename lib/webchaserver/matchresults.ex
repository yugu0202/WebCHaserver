defmodule Webchaserver.Matchresults do
  @moduledoc """
  The Matchresults context.
  """

  import Ecto.Query, warn: false
  alias Webchaserver.Repo

  alias Webchaserver.Matchresults.Matchresult

  @doc """
  Returns the list of matchresults.

  ## Examples

      iex> list_matchresults()
      [%Matchresult{}, ...]

  """
  def list_matchresults do
    Repo.all(Matchresult)
  end

  @doc """
  Gets a single matchresult.

  Raises `Ecto.NoResultsError` if the Matchresult does not exist.

  ## Examples

      iex> get_matchresult!(123)
      %Matchresult{}

      iex> get_matchresult!(456)
      ** (Ecto.NoResultsError)

  """
  def get_matchresult!(id), do: Repo.get!(Matchresult, id)

  def get_matchresult_by_match_id(match_id, opt \\ %{}) do
    opt = opt
    |> Map.filter(fn {_, v} -> v != nil end)
    |> Map.put(:match_id, match_id)
    |> Enum.map(fn {k, v} -> {k, v} end)

    IO.inspect(opt)

    Repo.one(from u in Matchresult, where: ^opt)
  end

  @doc """
  Creates a matchresult.

  ## Examples

      iex> create_matchresult(%{field: value})
      {:ok, %Matchresult{}}

      iex> create_matchresult(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_matchresult(attrs \\ %{}) do
    %Matchresult{}
    |> Matchresult.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a matchresult.

  ## Examples

      iex> update_matchresult(matchresult, %{field: new_value})
      {:ok, %Matchresult{}}

      iex> update_matchresult(matchresult, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_matchresult(%Matchresult{} = matchresult, attrs) do
    matchresult
    |> Matchresult.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a matchresult.

  ## Examples

      iex> delete_matchresult(matchresult)
      {:ok, %Matchresult{}}

      iex> delete_matchresult(matchresult)
      {:error, %Ecto.Changeset{}}

  """
  def delete_matchresult(%Matchresult{} = matchresult) do
    Repo.delete(matchresult)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking matchresult changes.

  ## Examples

      iex> change_matchresult(matchresult)
      %Ecto.Changeset{data: %Matchresult{}}

  """
  def change_matchresult(%Matchresult{} = matchresult, attrs \\ %{}) do
    Matchresult.changeset(matchresult, attrs)
  end
end
