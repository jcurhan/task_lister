$(document).ready(function() {
  $('#new_board').on('submit', app.boards.controller.new.init);
  $('.board-search').keyup( app.boards.controller.search);
  $('.board-search').keydown(function(event) {
    if(event.keyCode == 13) {
      event.preventDefault(); // prevent "Return" key for live search field
    }
  });
  $(".list-group").on({
    mouseenter: function() {
      $(this).toggleClass("active");
    },
    mouseleave: function() {
      $(this).toggleClass("active");
    }
  }, ".list-group-item");
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
    $('.list-group').empty()
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
            $('.list-group').prepend("<a href='/boards/" + searchBoardId + "' class='list-group-item'>" + searchBoardName + "</a>");
          }
        } else {
          $('.list-group').prepend("<h6>No Boards found</h6>")
        }
      })
    }
  }
}
