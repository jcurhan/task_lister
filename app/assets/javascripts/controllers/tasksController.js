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
    var taskId = $(this).attr('data-taskid');
    var path = $(this).parent().parent().parent().children().attr('action')
    var url = path + "/" + taskId
    if ($('#update-task').data('clicked', true)) {
       app.tasks.controller.edit.init(event, url)
       // want a click listener on the save changes button to grab the edited value and only then make the ajax update request, but 
       //then dont have access to taskId, path
    }
  });
});

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
          $('li[id=' + listId + '] .list_task').prepend("<li>" + description + " - " + priority + "<span class='delete-task' data-taskId=" + response.task.id + "> [DELETE]</span><span class='edit-task' data-taskId=" + response.task.id + "> [EDIT]</span></li>");
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
    init: function(event, url) {
      debugger;
     // event.preventDefault();
      $.ajax({
        url: url,
        method: "PUT"
      }).success(function(response){
        debugger;
      })
    }
  }
}
