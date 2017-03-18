var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

app.get('/', (req, res) => {
	res.send('Hello World!1111');
});

app.post('/alarms/new', jsonParser, (req, res) => {
	res.send(req.body);
});

app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port 3000!');
});
