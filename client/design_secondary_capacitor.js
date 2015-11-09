// Catch clicks in the dropdown, and set a session var for topload type.
Template.topload_selector.events({
  "click li": function(event, template){
    var loadType = event.currentTarget.id;
    Session.set("topload_type", loadType);
  }
});

// Helper for nav selection
Template.topload_selector.helpers({
  "toploadType": function() {
    return Session.get("topload_type");
  }
});