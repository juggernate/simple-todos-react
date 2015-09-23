//App component - represents the whole App
App = React.createClass({

  //mixin making getMeteorData work
  mixins: [ReactMeteorData],

  getInitialState() {
      return {
        hideCompleted: false
      }
  },

  getMeteorData() {
    let query = {};
    if (this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count()
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date()
    });

    React.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted(){
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
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
          <h1>Toodooz ({this.data.incompleteCount})</h1>

          <label className = "hide-completed">
            <input
              type = "checkbox"
              readOnly = {true}
              checked = {this.state.hideCompleted}
              onClick = {this.toggleHideCompleted} />
              Hide Completed Tasks
          </label>

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
