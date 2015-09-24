//Define collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  //client only

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("tasks");

  Meteor.startup(function(){
    React.render(
      <App />, document.getElementById("render-target")
    );
  });
}

if(Meteor.isServer){
  //Only publish tasks belonging to current user
  Meteor.publish("tasks", function() {
    return Tasks.find({
        $or: [
          {private: {$ne: true}},
          {owner: this.userId}
        ]
    });
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
    const task = Tasks.findOne(taskId);

    // if (task.owner !== Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }

    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    // console.log("Checking Task: " + task);
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, {$set: { checked: setChecked }});
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    if (task.owner !== Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});
