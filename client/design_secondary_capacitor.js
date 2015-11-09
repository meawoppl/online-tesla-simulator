// Catch clicks in the dropdown, and set a session var for topload type.
Template.topload_selector.onRendered(function() {
	Session.setDefault("topload_type", "spherical_topload");
});

Template.topload_selector.events({
  "click li": function(event, template){
    var loadType = event.currentTarget.id;
    Session.set("topload_type", loadType);
    console.log("Set topload type to " + loadType);
  }
});

// Helper for nav selection of which topload geometry.
Template.design_secondary_capacitor.helpers({
  "topload_session_var": function() {
    return Session.get("topload_type");
  }
});

Template.topload_selector.helpers({
  "currentToploadName": function(){
    return Session.get("topload_type").split("_")[0];
  }
});


// Based loosely on http://www.teslacoildesign.com/design.html#design_topload
// Similar equations found here:
// http://deepfriedneon.com/tesla_f_calctoroid.html
var estimateTorioidCapacatance = function(ring_d_inches, overall_d_inches) {
	var ratio = ring_d_inches / overall_d_inches;
	var prod = ring_d_inches * overall_d_inches;
	var ring_sq = ring_d_inches * ring_d_inches;

	var pi = Math.PI;
	var c1 = (1.2781 - ratio) * Math.sqrt(2 * pi * prod);
	var c2 = (1.2800 - ratio) * Math.sqrt(2 * pi * (prod - ring_sq));
	var c3 = (1.252296756620) * Math.sqrt(2 * pi * (prod - ring_sq)); 

	console.log("New Estimates:")
	console.log(c1);
	console.log(c2);
	console.log(c3);

	return (c1 + c2 + c3) / 3;
};

var recalc_torioid_cap = function(){
  var r1_inch = parseFloat($("#r_big").val()) * 2.54;
  var r2_inch = parseFloat($("#r_sml").val()) * 2.54;
  // MRG TODO: Sanity check r1 > r2 * 2 or so
  // other sanity checks as well.

  var capEtimate = estimateTorioidCapacatance(r1_inch, r2_inch);
  Session.set("topload_cap", capEtimate);
};


Template.toroidal_topload.events({
  "focusout input": recalc_torioid_cap
});
