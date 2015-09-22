if (Meteor.isClient) {
  //client only

  Meteor.startup(function(){
    React.render(
      <App />, document.getElementById("render-target")
    );
  });
}
