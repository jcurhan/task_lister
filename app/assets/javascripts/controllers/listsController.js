$(document).ready(function() {
  $('#new_list').on('submit', app.lists.controller.new.init)
});

app.lists.controller = {
  new: {
    init: function(event) {
      event.preventDefault();
      var listValue = $('#list_title').val();
      var url = $(this).attr("action")
      $('#list_title').val("");
      $.ajax({
        url: url,
        data: {title: listValue},
        method: 'POST'
      }).success(function(response) {
        var list_id = response.list.id;
        var title = response.list.title;
        var board_id = response.list.board_id;
        var list = new app.lists.model.new(list_id, title) // Not currently associated with board in js model
        $('#board_lists').append(response.html);
      })
    }
  }
}
