class ListsController < ApplicationController
  before_action :find_list, only: [:show]

  def create
    @list = List.new(list_params)
    @list.board_id = params[:board_id]
    @board = @list.board
    if @list.save
      html_string = render_to_string(partial: 'shared/tasks_form', locals: { list: @list })
      render json: {list: @list, html: html_string}
    else
      render "boards/show"
    end
  end

  def show
    @task = Task.new
  end

  private

  def find_list
    @list = List.find(params[:id])
  end

  def list_params
    params.permit(:title)
  end
end
