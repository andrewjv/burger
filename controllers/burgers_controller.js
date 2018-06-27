var express = require('express');
var router = express.Router();

var burger = require('../models/burger.js');

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	burger.all(function(data){
		var hbsObject = {burgers: data};

		console.log(hbsObject);

		res.render('index', hbsObject);
	});
});

router.post('/api/burgers', function(req, res){
	burger.create(['burger_name'], [req.body.burger_name], function(result){
		// res.redirect('/burgers')
		res.json({id: result.insertId, burger_name: req.body.burger_name })
	});
});

router.put('/burgers/update/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	console.log('condition ', condition);

	burger.update({'devoured': req.body.devoured}, condition, function(data){
		res.send(data);
		// res.redirect('/burgers');
	});
});

module.exports = router;
