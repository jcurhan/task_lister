app.lists.model = {
  all: [],
  new: function List(id, title) {
    this.id = id;
    this.title = title;
    var self = this;

    (function initialize(){
      app.lists.model.all.push(self)
    }())
  }
}
