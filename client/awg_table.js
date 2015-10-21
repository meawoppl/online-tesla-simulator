var awgTable = new Meteor.Collection("awgTable");

Template.awgDropdown.helpers({
  wireGauge: function(){
    return awgTable.find();;
  }
});

Template.awgEntry.events({
  "click li": function(event, template){
    var newTemplateName = event.currentTarget.name;
    $("#gauge").val(template.data.diameter);
  }
});
