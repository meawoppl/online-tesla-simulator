var PI = 3.14159265359;

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

Template.design_secondary_inductor.events({
  "focusout input": recalcPrimaryInductorProperties
});

Template.design_secondary_inductor.helpers({
  capacatance: function(){Session.get("sI_c")},
  inductance: function(){Session.get("sI_i")},
  resistance: function(){Session.get("sI_r")}
});
