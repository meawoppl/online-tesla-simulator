// Gross navigation to the various sub-pages
Template.navBar.events({
  "click .nav-button": function(event, template){
    var newTemplateName = event.currentTarget.name;
    Session.set("nav", newTemplateName);
  }
})

// Default to the navigation page if there is no other session var
Template.navBar.onRendered(function(){
  Session.setDefault("nav", "mot");
});

// Helper for nav selection
Template.navBar.helpers({
  "activeTemplateName": function() {
    return Session.get("nav");
  }
});
