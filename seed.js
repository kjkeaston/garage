var db = require('./models');


var vehicles = [
{
	make: "Mercedez-benz",
	model: "S class",
	year: "2016",
	color: "silver",
	img: "url",
	category: [{name: "Luxury"}]
}
];



var categories = [
{
	name: "Luxury"
}, 
{
	name: "Sport"
}, 
{
	name: "Muscle"
}, 
{
	name: "Exotic"
}, 
{
	name: "SUV"
}, 
{
	name: "Pick-up"
}, 
{
	name: "Sedan"
}
]; 

//console.log (vehicles);
db.Vehicle.remove({}, function(err, vehicles) {
	
})
