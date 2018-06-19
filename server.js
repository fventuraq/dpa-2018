var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('barco', ['barco']);
var bodyParser = require ('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/barco', function (req, res){
	console.log("Estoy recibiendo el requerimiento")

	db.barco.find(function (err, docs){
    console.log()
		console.log(docs);
		res.json(docs);
	});
});

app.post('/barco', function (req, res){
	console.log(req.body);
	db.barco.insert(req.body, function(err, doc){
		res.json(doc);
		console.log("He añadido un nuevo contactos")
	});
});

app.delete('/barco/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.barco.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/barco/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.barco.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/barco/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.barco.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {latori: req.body.latori, lonori: req.body.lonori, latdes: req.body.latdes,
    londes: req.body.londes}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server running on port 3000");
console.log("Hola que hace?");
