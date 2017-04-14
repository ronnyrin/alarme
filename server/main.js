var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host: 'eu-cdbr-west-01.cleardb.com',
	user: 'bda4bbdeef160c',
	password: 'c704940c',
	database: 'heroku_5bc3f1207d82f19'
});

connection.connect(function (err) {
	if (!err) {
		console.log("Database is connected ... nn");
	} else {
		console.log("Error connecting database ... nn");
	}
});

var jsonParser = bodyParser.json();

app.get('/', (req, res) => {
	res.send('Hello World!1111');
});

app.post('/alarms/new', jsonParser, (req, res) => {
	const query = connection.query('INSERT INTO `alarms` (`id`, `user`, `game`) VALUES ("0", ?, ?)', [req.body.id, req.body.game], function (error, results, fields) {
		if (error) throw error;
		// ...
	});
	res.send(query.sql);
});

app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port ' + process.env.PORT || 5000);
});
