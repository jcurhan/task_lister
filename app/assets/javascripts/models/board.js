app.boards.model = {
  all: [],
  new: function Board(id, name) {
    this.id = id;
    this.name = name;
    var self = this;

    (function initialize() {
      app.boards.model.all.push(self);
    }())
  }
}
