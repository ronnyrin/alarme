var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var jsonParser = bodyParser.json();
var pool = mysql.createPool({
	connectionLimit: 100, //important
	host: 'eu-cdbr-west-01.cleardb.com',
	user: 'bda4bbdeef160c',
	password: 'c704940c',
	database: 'heroku_5bc3f1207d82f19',
	debug: false
});

function handle_database(req, res) {

	pool.getConnection(function (err, connection) {
		if (err) {
			res.json({"code": 100, "status": "Error in connection database"});
			return;
		}

		console.log('connected as id ' + connection.threadId);

		connection.query('INSERT INTO `alarms` (`id`, `user`, `game`) VALUES ("0", ?, ?)', [req.body.user, req.body.game], function(err,rows){
			connection.release();
			if (!err) {
				res.json(rows);
			}
		});

		connection.on('error', function (err) {
			res.json({"code": 100, "status": "Error in connection database"});
			return;
		});
	});
}


app.get('/', (req, res) => {
	res.send('Hello World!1111');
});

app.post('/alarms/new', jsonParser, (req, res) => {
	handle_database(req, res);
});

app.listen(process.env.PORT || 5000, function () {
	console.log('alarme listening on port ' + process.env.PORT || 5000);
});
