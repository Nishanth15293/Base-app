/**
 * Created by Nishanth on 9/15/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
    firstName: {
        type:String
    },
    lastName: String,
    email: {
        type: String
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    }, 
    facebookId: {
        type: String
    }, 
    displayName: {
        type: String
    }

});

UserSchema.methods.toJSON = function(){
    console.log(this.toObject());
    var user = this.toObject();
    delete user.password;
    return user; 
};

UserSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })

})

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;