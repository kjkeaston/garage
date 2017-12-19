var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/garage', {useMongoClient: true});
mongoose.Promise = global.Promise;