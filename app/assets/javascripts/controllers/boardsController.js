$(document).ready(function() {
  $('#new_board').on('submit', app.boards.controller.new.init);
  $('.board-search').keyup( app.boards.controller.search);
  $('.board-search').keydown(function(event) {
    if(event.keyCode == 13) {
      event.preventDefault(); // prevent "Return" key for live search field
    }
  });
})

app.boards.controller = {
  new: {
      init: function(event) {
      event.preventDefault();
      var boardValue = $('#board_name').val();
      $('#board_name').val('');
      // AJAX REQUEST TO CREATE BOARD
      $.ajax({
        url: '/boards',
        data: {name: boardValue},
        method: 'POST'
        }).success(function(response) {
          var id = response.id
          var name = response.name
          var board = new app.boards.model.new(id, name)
          $('.append-board-button').append("<a class='btn btn-primary btn-lg btn-block' href='/boards/" + board.id + "'>" + board.name + "</a>")
        })
      }
    },
  search: function() {
    $('.search-results').empty()
    searchVal = $(this).val()
    if (!!searchVal) {
      $.ajax({
        url: '/boards/search',
        data: {search: searchVal},
        method: 'GET'
      }).success(function(response) {
        if (response.length > 0 ) {
          for (i = 0; i < response.length; i++) { 
            var searchBoardName = response[i].name;
            var searchBoardId = response[i].id;
            $('.search-results').prepend("<li><a href='/boards/" + searchBoardId + "'>" + searchBoardName + "</a></li>");
          }
        } else {
          $('.search-results').prepend("<li>No Boards found</li>")
        }
      })
    }
  }
}
