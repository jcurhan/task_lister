$(document).ready(function() {
  $(document).on('submit', '.new_task', function(){
    $('.error_messages').empty();
    var taskDescriptionValue = $(this).find('#task_description').val();
    var taskPriorityValue = $(this).find('#task_priority').val();
    var url = $(this).attr('action')
    $(this).find('#task_description').val("");
    app.tasks.controller.new.init(event, taskDescriptionValue, taskPriorityValue, url);
  })
  $(document).on('click', '.delete-task', function() {
    var taskId = $(this).attr('data-taskid');
    var path = $(this).parent().parent().siblings().attr('action')
    var url = path + "/" + taskId
    app.tasks.controller.destroy.init(event, url)
  })
  $(document).on('click', '.edit-task', function() {
    // To Do: Have a modal pop up on click, then capture the altered text to make ajax request on submit of the edit
    $('#taskModal').modal('show')
    var taskDescription = $(this).parent().find('.task-description').text()
    var taskPriority = $(this).parent().find('.task-priority').text()
    var taskId = $(this).attr('data-taskid');
    var path = $(this).parent().parent().parent().children().attr('action')
    var url = path + "/" + taskId
    $('#edit-task-field').val(taskDescription) // prefill description field
    $('#edit-task-priority').val(taskPriority) // preselect priority field
    $('#update-task').on('click', function(){
      $('#task-error-message').empty()
      var $modalBody = $(this).parent().parent();
      var updatedTask = $modalBody.find('#edit-task-field').val()
      var updatedPriority = $modalBody.find('#edit-task-priority').val()
      app.tasks.controller.edit.init(event, url, updatedTask, updatedPriority)
    })
  });
});

// move the logic in the listeners above into the functions below?

app.tasks.controller = {
  new: {
    init: function(event, taskDescriptionValue, taskPriorityValue, url) {
      event.preventDefault();
     $.ajax({
      url: url,
      method: "POST",
      data: {description: taskDescriptionValue, priority: taskPriorityValue}
     }).success(function(response){
        if (response.success) {
          var listId = response.task.list_id;
          var taskId = response.task.id;
          var description = response.task.description;
          var priority = response.task.priority;
          var task = new app.tasks.model.new(taskId, description, priority)
          $('li[id=' + listId + '] .list_task').prepend("<li><span class='task-description'>" + description + "</span> - <span class='task-priority'>" + priority + "</span><span class='delete-task' data-taskId=" + response.task.id + "> [DELETE]</span><span class='edit-task' data-taskId=" + response.task.id + "> [EDIT]</span></li>");
        } else if (!response.success) {
          var errorMessage = response.error
          $('.error_messages').prepend('<h3>' + errorMessage + '</h3>')
        }
     })
    }
  },
  destroy: {
    init: function(event, url) {
      event.preventDefault();
      $.ajax({
        url: url,
        method: "DELETE"
      }).success(function(response) {
        var taskId = response.taskId
        var $spanTask = $(document).find('li span[data-taskid=' + taskId + ']')
        $spanTask.parent().remove()
      })
    }
  },
  edit: {
    init: function(event, url, updatedTask, updatedPriority) {
      event.preventDefault
      $.ajax({
        url: url,
        method: "PUT",
        data: {description: updatedTask, priority: updatedPriority}
      }).success(function(response){
        if (response.success) {
          $('#taskModal').modal('hide')
          var updatedTask = response.task.description;
          var updatedPriority = response.task.priority;
          var taskId = response.task.id
          var listId = response.list.id 
          app.tasks.controller.render(updatedTask, updatedPriority, taskId, listId)
        } else if (!response.success) {
          var errorMessage = response.error;
          $('#task-error-message').append(errorMessage)  
        }
      })
    }
  },
  render: function(updatedTask, updatedPriority, taskId, listId) {
    debugger;
  }
}
