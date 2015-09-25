// Known coils parameters
var c = [
  {name: "Orage",
   affiliation: "CDF",
   secondaryH: 900,
   secondaryW: 180,
   secondaryG: 0.2,
   secondaryE: 1.02,
   primaryRi: 25,
   primaryRe: 55,
   primaryN: 4.5,
   capC: 1.1,
   capV: 10000,
   toroidA: 7
  },
  {name: "Coup De Foudre",
   affiliation: "CDF",
   secondaryH: 900,
   secondaryW: 180,
   secondaryG: 0.2,
   secondaryE: 1.02,
   primaryRi: 25,
   primaryRe: 55,
   primaryN: 4.5,
   capC: 1.1,
   capV: 10000
}];

// MRG TODO: Make a package
coils = new Meteor.Collection("confirmed-coils");

if(coils.find().count() === 0) {
	console.log("DB Scrubbed.  Repopulating know coils");
	_.each(c, function(c) {coils.insert(c)});
};
