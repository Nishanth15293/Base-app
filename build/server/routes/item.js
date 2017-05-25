var Item = require('../models/itemModel');

module.exports = function(app){
	app.get('/api/items', function(req, res) {
	    // use mongoose to get all items in the database
	    Item.find(function(err, items) {

	        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
	        if (err)
	            res.send(err)

	        res.json(items); // return all items in JSON format
	    });
	});

	// create Item and send back all items after creation
	app.post('/api/items', function(req, res) {

	    // create a Item, information comes from AJAX request from Angular
	    Item.create({
	        text : req.body.name,
	        quantity : req.body.quantity,
	        price : req.body.price,
	        store : req.body.store,
	        done : false,
	        notes: req.body.notes
	    }, function(err, item) {
	        if (err)
	            res.send(err);

	        // get and return all the items after you create another
	        Item.find(function(err, items) {
	            if (err)
	                res.send(err)
	            res.json(items);
	        });
	    });

	});

	// delete a item
	app.delete('/api/items/:todo_id', function(req, res) {
	    Item.remove({
	        _id : req.params.todo_id
	    }, function(err, item) {
	        if (err)
	            res.send(err);

	        // get and return all the items after you create another
	        Item.find(function(err, items) {
	            if (err)
	                res.send(err)
	            res.json(items);
	        });
	    });
	});
};