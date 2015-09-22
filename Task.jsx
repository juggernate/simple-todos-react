// Task component - single todo item
Task = React.createClass({
  propTypes: {
    //get the task to display through a React prop
    //can use PropTypes to indicate it is require
    task: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li> {this.props.task.text}</li>
    );
  }
});
