$(document).ready(function() {
  $('#new_board').on('submit', app.boards.controller.new.init);
})

app.boards.controller = {
new: {
    init: function(event) {
    event.preventDefault();
    var boardValue = $('#board_name').val();
    // AJAX REQUEST TO CREATE BOARD
    $.ajax({
      url: '/boards',
      data: {name: boardValue},
      method: 'POST'
      }).success(function(response) {
        var id = response.id
        var name = response.name
        var board = new app.boards.model.new(id, name)
        $('.boards').append("<a class='btn btn-primary btn-lg btn-block' href='/boards/" + board.id + "'>" + board.name + "</a>")
      })
    }
  }
}
