// This table has the wire-gague name, diameter in 
// inch and mm, and the resistance per kilometer
var awgDinDmmOpK =
[[-3, 0.4600, 11.6840, 0.1608],
[-2, 0.4096, 10.4050, 0.2028],
[-1, 0.3648, 9.2660, 0.2557],
[0, 0.3249, 8.2510, 0.3224],
[1, 0.2893, 7.3480, 0.4066],
[2, 0.2576, 6.5440, 0.5127],
[3, 0.2294, 5.8270, 0.6465],
[4, 0.2043, 5.1890, 0.8152],
[5, 0.1819, 4.6210, 1.0280],
[6, 0.1620, 4.1150, 1.2960],
[7, 0.1443, 3.6650, 1.6340],
[8, 0.1285, 3.2640, 2.0610],
[9, 0.1144, 2.9060, 2.5990],
[10, 0.1019, 2.5880, 3.2770],
[11, 0.0907, 2.3050, 4.1320],
[12, 0.0808, 2.0530, 5.2110],
[13, 0.0720, 1.8280, 6.5710],
[14, 0.0641, 1.6280, 8.2860],
[15, 0.0571, 1.4500, 10.450],
[16, 0.0508, 1.2910, 13.170],
[17, 0.0453, 1.1500, 16.610],
[18, 0.0403, 1.0240, 20.950],
[19, 0.0359, 0.9120, 26.420],
[20, 0.0320, 0.8120, 33.310],
[21, 0.0285, 0.7230, 42.000],    
[22, 0.0253, 0.6440, 52.960], 
[23, 0.0226, 0.5730, 66.790], 
[24, 0.0201, 0.5110, 84.220], 
[25, 0.0179, 0.4550, 106.20], 
[26, 0.0159, 0.4050, 133.90], 
[27, 0.0142, 0.3610, 168.90], 
[28, 0.0126, 0.3210, 212.90], 
[29, 0.0113, 0.2860, 268.50], 
[30, 0.0100, 0.2550, 338.60],
[31, 0.0089, 0.2270, 426.90],
[32, 0.0080, 0.2020, 538.30],
[33, 0.0071, 0.1800, 678.80], 
[34, 0.0063, 0.1600, 856.00], 
[35, 0.0056, 0.1430, 1079.0], 
[36, 0.0050, 0.1270, 1361.0], 
[37, 0.0045, 0.1130, 1716.0], 
[38, 0.0040, 0.1010, 2164.0], 
[39, 0.0035, 0.0897, 2729.0], 
[40, 0.0031, 0.0799, 3441.0]];


var awgTable = new Meteor.Collection("awgTable");
if (awgTable.find().count() === 0){
	console.log("Repopulating AWG Table");

	console.log(awgDinDmmOpK);
	awgDinDmmOpK.forEach(function(entry, _, __){
		console.log(entry);
		awgTable.insert({gaugeName: entry[0], diameter:entry[2], resistance:entry[3]});
	});
};

Meteor.publish("", function(){
	return awgTable.find()
})