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
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.textInput).value.trim();

    // Tasks.insert({
    //   text: text,
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username
    // });
    Meteor.call("addTask", text);

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted(){
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton} />;
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

          <AccountsUIWrapper />

          {this.data.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref="textInput"
                placeholder="Add new task" />
            </form>
            : ''
          }

        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
