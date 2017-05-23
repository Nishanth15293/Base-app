
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
 	name: {
        type:String
    },
    qty: String,
    price: {
        type: String
    },
    store: {
        type: String
    },
    done: {
    	type: Boolean
    },
    notes: {
        type: String
    }
})

ItemSchema.methods.toJSON = function(){
    var item = this.toObject();
    return item; 
};


// the schema is useless so far
// we need to create a model using it
var Item = mongoose.model('Item', ItemSchema);

// make this available to our users in our Node applications
module.exports = Item;