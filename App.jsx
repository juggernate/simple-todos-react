//App component - represents the whole App
App = React.createClass({

  //mixin making getMeteorData work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      tasks: Tasks.find({}).fetch()
    }
  },

  // getTasks() {
  //   return [
  //     { _id: 1, text: "Task 1"},
  //     { _id: 2, text: "Task 2"},
  //     { _id: 3, text: "Task 3"}
  //   ];
  // },

  handleSubmit(event) {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date()
    });

    React.findDOMNode(this.refs.textInput).value = "";
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todooz</h1>

          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref="textInput"
              placeholder="Add new task" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
