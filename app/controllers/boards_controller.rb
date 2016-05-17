class BoardsController < ApplicationController
  before_action :find_board, only: [:show]

  def index
    @boards = Board.all
  end

  def create
    # {"name"=>"Something", "controller"=>"boards", "action"=>"create"}
    @board = Board.new(board_params)
    if @board.save
      render json: @board
    else
      render 'index'
    end
  end

  def show
    @list = List.new
  end

  private

  def board_params
    params.permit(:name)
  end

  def find_board
    @board = Board.find(params[:id])
  end
end
