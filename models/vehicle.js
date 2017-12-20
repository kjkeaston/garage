let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Category = require('./category');

 // Vehicle Schema
 let VehicleSchema = new Schema({
  make: String,
  model: String,
  year: String,
  color: String,
  image: String,
  categories: [Category.schema]
 })

 let Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;