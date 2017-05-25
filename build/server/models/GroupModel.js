
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
 	name: {
        type:String
    },
    description: {
        type: String
    }
})

GroupSchema.methods.toJSON = function(){
    var group = this.toObject();
    return group; 
};


// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model('Group', GroupSchema);

// make this available to our users in our Node applications
module.exports = Group;