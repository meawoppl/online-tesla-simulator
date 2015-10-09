Template.navBar.events({
  "click .nav-button": function(event, template){
    var newTemplateName = event.currentTarget.name;
    console.log("Navigating to " + newTemplateName);
    Session.set("nav", newTemplateName);
  }
})

Template.navBar.onRendered(function(){
  Session.setDefault("nav", "mot");
});


Template.navBar.helpers({
  "activeTemplateName": function() {
    return Session.get("nav");
  }
});

Template.mode.onRendered(function(){
  console.log("Mode Rendered");
});


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
})

var PI = 3.1415;

var recalcPrimaryInductorProperties = function() {
  console.log("Recalculatig");
  var h = parseFloat($("#height").val());
  var w = parseFloat($("#width").val());

  var g = parseFloat($("#gauge").val());
  var p = parseFloat($("#packing").val());

  // Convert to meters
  var ohmsPerM = parseFloat($("#ohms").val()) / 1000;

  console.log(g, p, h, w)

  // General geometry
  var verticalSpacing = g * p;
  var numberOfTurns = h / verticalSpacing;

  console.log(numberOfTurns);

  // Resistance calculation
  var wirePerTurn = PI * w;
  var wireLength = numberOfTurns * wirePerTurn;
  var resistance = wireLength * ohmsPerM;
  Session.set("sI_r", resistance);

  // Inductance calculation
  var magPermeability = 4 * PI * Math.pow(10, -7);
  var crossSection = PI * Math.pow(w / 2, 2);
  var inductance = (magPermeability * Math.pow(numberOfTurns, 2) * crossSection) / h;
  Session.set("sI_i", inductance);

  // Capacatance calculation from here:
  // http://electronics.stackexchange.com/questions/111947/calculate-capacitance-in-inductors
  var e = 8.856;  // pF/m
  var eExternal = 1;

  var phi = Math.atan(verticalSpacing / (PI * w));

  var dol = w / h;
  var kc = (0.106 * dol * dol) + (0.717439 * dol) + (0.933048 * Math.pow(dol, 3 / 2));

  var eInternal = 1;
  var term1 = 4 * h * e * eExternal;
  var term2 = (0.5 * kc * (eInternal / eExternal + 1) ) + 1;
  var term3 = PI * Math.pow(Math.cos(phi), 2);

  var cap = (term1 * term2) / term3;
  Session.set("sI_c", cap);

  console.log("Cap est mF");
  console.log(cap / 1000000);
};

Template.sI.events({
  "focusout input": recalcPrimaryInductorProperties
})

Template.sI.helpers({
  capacatance: function(){Session.get("sI_c")},
  inductance: function(){Session.get("sI_i")},
  resistance: function(){Session.get("sI_r")}
})


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