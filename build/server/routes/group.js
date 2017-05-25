var Group = require('../models/GroupModel');

module.exports = function(app){
    app.get('/api/groups', function(req, res) {
	    Group.find(function(err, groups) {
	        if (err)
	            res.send(err)

	        res.json(groups); // return all items in JSON format
	    });
	});

	app.post('/api/groups', function(req, res) {

	    Group.create({
	        name : req.body.name,
	        description : req.body.description,
	    }, function(err, group) {
	        if (err)
	            res.send(err);

	        Group.find(function(err, groups) {
	            if (err)
	                res.send(err)
	            res.json(groups);
	        });
	    });

	});

	// delete a item
	app.delete('/api/groups/:todo_id', function(req, res) {
	    Group.remove({
	        _id : req.params.todo_id
	    }, function(err, group) {
	        if (err)
	            res.send(err);

	        // get and return all the groups after you create another
	        Group.find(function(err, groups) {
	            if (err)
	                res.send(err)
	            res.json(groups);
	        });
	    });
	});
}