Template.stepOne.helpers({
  ratio: function () {
    return Session.get('counter');
  }
});
 Template.stepOne.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
}