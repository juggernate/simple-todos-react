// Task component - single todo item
Task = React.createClass({
  propTypes: {
    //get the task to display through a React prop
    //can use PropTypes to indicate it is require
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // Tasks.update(this.props.task._id, {
    //   $set: {checked: ! this.props.task.checked}
    // });
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },

  deleteThisTask() {
    // Tasks.remove(this.props.task._id);
    Meteor.call("removeTask", this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  render() {

    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");
    const username = this.props.task.username;
    const userPrefix = username ? (username + ": ") : "";

    return (
      <li className={taskClassName}>

        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className = "toggle-private" onClick = {this.togglePrivate}>
            {this.props.task.private ? "Private" : "Public" }
          </button>
        ) : ''}

        <span className="text">
          <strong>{userPrefix}</strong>
          {this.props.task.text}
        </span>

      </li>
    );
  }
});
