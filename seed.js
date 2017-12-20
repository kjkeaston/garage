let db = require('./models');


let vehicles = [
	{
		make: "Mercedes-benz",
		model: "S class",
		year: "2016",
		color: "Silver",
		img: "url",
    	categories: []
	},
  {
    make: "BMW",
    model: "M5",
    year: "2017",
    color: "White",
    img: "https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/bmw-m5-tire-stickers-520x338.jpg",
  },
  {
    make: "Land Rover",
    model: "Defender",
    year: "1997",
    color: "Black",
    img: "http://www.defendersource.com/forum/images/dto_garage/users/5810/1076.jpg"
  }
];



let categories = [
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
// db.Vehicle.remove({}, function(err, vehicles) {
	
// })
// =======
// console.log(vehicles);
// console.log(categories);


