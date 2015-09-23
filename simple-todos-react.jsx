//Define collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  //client only

  Meteor.startup(function(){
    React.render(
      <App />, document.getElementById("render-target")
    );
  });
}
