// Task component - single todo item
Task = React.createClass({
  propTypes: {
    //get the task to display through a React prop
    //can use PropTypes to indicate it is require
    task: React.PropTypes.object.isRequired
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

  render() {

    const taskClassName = this.props.task.checked ? "checked" : "";
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

        <span className="text">
          <strong>{userPrefix}</strong>
          {this.props.task.text}
        </span>

      </li>
    );
  }
});
