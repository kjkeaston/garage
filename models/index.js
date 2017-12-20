let mongoose = require('mongoose');

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/garage', {useMongoClient: true});

mongoose.Promise = global.Promise;

let Vehicle = require('./vehicle');
let Category = require('./category');

module.exports = {
  Vehicle: Vehicle,
  Category: Category
};


// module.exports.Vehicle = Vehicle;
// module.exports.Category = Category;
