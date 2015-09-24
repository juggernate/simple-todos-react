//Define collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  //client only

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function(){
    React.render(
      <App />, document.getElementById("render-target")
    );
  });
}

Meteor.methods({
  addTask(text) {
    if (! Meteor.userId()) {
      throw Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    Tasks.update(taskId, {$set: { checked: setChecked }});
  }
});
