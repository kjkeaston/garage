let db = require('./models');


let allCategories = [
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


let allVehicles = [
	{
		make: "Mercedes-Benz",
		model: "S-Class",
		year: "2016",
		color: "Silver",
		image: "http://strongauto.net/wp-content/uploads/images/2014-Mercedes-Benz-S-Class_3069.jpg",
    categories: [allCategories[0], allCategories[6]] //{name: "luxury"}
	},
  {
    make: "BMW",
    model: "M5",
    year: "2017",
    color: "White",
    image: "https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/bmw-m5-tire-stickers-520x338.jpg",
    categories: [allCategories[0], allCategories[1], allCategories[6]]
  },
  {
    make: "Land Rover",
    model: "Defender",
    year: "1997",
    color: "Black",
    image: "http://www.defendersource.com/forum/images/dto_garage/users/5810/1076.jpg",
    categories: [allCategories[0] ,allCategories[4]]
  }
];


// allVehicles.forEach(function(vehicles) {
//   vehicles.categories = allCategories;
// })


db.Vehicle.remove({}, function(err, vehicles){
  // code in here runs after all vehicles are removed
  db.Vehicle.create(allVehicles, function(err, vehicles){
    // code in here runs after all vehicles are created
    if (err) { return console.log('ERROR', err); }
    console.log("All vehicles:", vehicles);
    console.log("created", vehicles.length, "vehicles");
    process.exit();
  });
});

