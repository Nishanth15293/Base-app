var User = require('../models/userModel');
var localStrategy = require('passport-local').Strategy;

var strategyOptions = {
    usernameField: 'email',
    passReqToCallback: true
}

exports.login = new localStrategy(strategyOptions, function(req, email, password, done) {
    var query ={email: email};
    User.findOne(query, function(err,user) {
        if (err) return done(err);

        if (!user) 
            return done(null, false, {
                message : 'User Email not found!'
            })
        else if (user) {

            user.comparePassword(password, function(err, isMatch){
                if(err) done(err);

                if(!isMatch){
                    return done(null,false,{message : 'Incorrect Password! Please Try Again!'});
                }

                // if(isMatch){
                    return done(null, user);
                // }

            });
        }
    })
});

exports.register = new localStrategy(strategyOptions, function(req, email, password, done){
    var payload = req.body;
    var user = new User({
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : email,
        password : password
    });

    var query ={email: email};
    User.findOne(query, function(err,existingUser) {
        if (err) return done(err);

        if (existingUser) 
            return done(null, false, {
                message : 'This email already exists!'
            })
        user.save(function(err){
            if(err){
                done(err);
            }
            else {
                console.log('user saved sucess!');
                return done(null, user);
            }
        });
    });
})