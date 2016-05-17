app.tasks.model = {
  all: [],
  new: function Task(id, description, priority) {
    this.description = description;
    this.priority = priority;
    this.id = id;
    var self = this;
    (function initialize() {
      app.tasks.model.all.push(self)
    }())
  }
}
