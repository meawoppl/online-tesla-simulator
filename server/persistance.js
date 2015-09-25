Meteor.publish("confirmedCoils", function(){
	return coils.find({confirmed: true});
});

Meteor.publish("myCoil", function(identifier){
	return coils.findOne({hid: identifier})
});
