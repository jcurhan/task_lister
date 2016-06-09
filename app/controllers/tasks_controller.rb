class TasksController < ApplicationController

  def create
    @task = Task.new(task_params)
    @task.list_id = params[:list_id]
    @board = @task.list.board
    if @task.save
      render json: { task: @task, success: true }
    else
      render json: { error: 'Description cannot be blank.', success: false }
    end
  end

  def update
    @task = Task.find(params[:id]) 
    @list = @task.list
    if @task.update(task_params)
      render json: { task: @task, list: @list, success: true }
    else
      render json: { error: @task.errors.full_messages.first, success: false }
    end
  end

  def destroy
    task = Task.find(params[:id])
    task_id = task.id
    task.destroy
    render json: { taskId: task_id }
  end

  private

  def task_params
    params.permit(:description, :priority)
  end
end
