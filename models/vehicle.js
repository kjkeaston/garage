var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Category = require('./category.js');

 // Vehicle Schema
 var VehicleSchema = new Schema({
  make: String,
  model: String,
  year: String,
  color: String,
  image: String,
  category: [Category.Schema]
 })

 var Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;