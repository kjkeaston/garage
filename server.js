let express = require('express');
	  db = require('./models');
	  bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public', {root: __dirname}));


app.get('/', function homepage(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});






app.listen(process.env.PORT || 3000, function () {
	console.log ('Express server is up and running on http://localhost:3000/');
});