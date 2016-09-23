/**
 * Created by Nishanth on 9/15/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: {
        type:String
    },
    lastName: String,
    email: {
        type: String
    },
    password: {
        type: String
    }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;