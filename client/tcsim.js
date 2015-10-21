
Template.mode.onRendered(function(){
  console.log("Mode Rendered");
});

// Template.stepOne.helpers({
//   ratio: function () {
//   	var h = $("height").value().toNumber();
//   	var w = $("width").value().toNumber();

//     return h / w;
//   },
//  inductance: function(){
//   	var h = $("height").value();
//   	var w = $("width").value();
//   	var g = $("gauge").value();
//   	var f = $("factor").value();

//   	// MRG TODO: Inductance calculation here
//   	return 0;
//  }
// });

// Template.stepTwo.helpers({

// })


// Template.stepOne.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
// });