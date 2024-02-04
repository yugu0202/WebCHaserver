defmodule WebchaserverWeb.PageHTML do
  use WebchaserverWeb, :html

  embed_templates "page_html/*"

  attr :current_user, :map, default: nil

  def myheader(assigns) do
    ~H"""
    <section class="w-full px-8 text-gray-700 bg-white mb-10">
      <div class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div class="relative flex flex-col md:flex-row">
          <a href="/" class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">
              WebCHaserver
            </span>
          </a>
          <nav class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            <a href="/" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
              Home
            </a>

            <%= if @current_user do %>
              <.link href={~p"/gettoken"} class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Get Token
              </.link>
              <.link href={~p"/mymatch"} class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                My Match
              </.link>
              <.link href={~p"/creatematch"} class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Create Match
              </.link>
            <% end %>

          </nav>
        </div>

        <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
        <%= if @current_user do %>
          <.link href={~p"/users/settings"} class="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
            <%= @current_user.email %>
          </.link>
          <.link href={~p"/users/log_out"} method="delete" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
            Sign out
          </.link>
        <% else %>
          <.link href={~p"/users/log_in"} class="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
            Sign in
          </.link>
          <.link href={~p"/users/register"} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
            Sign up
          </.link>
        <% end %>
        </div>
      </div>
    </section>
    """
  end
end
