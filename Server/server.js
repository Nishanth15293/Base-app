/**
 * Created by Nishanth on 8/30/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/angular2');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var jwt = require('jwt-simple');
var User = require('./models/userModel');
var CONFIG = require('./config');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
})

app.use('/js', express.static(path.resolve(__dirname, '../build/Client/js')));
app.use('/styles', express.static(path.resolve(__dirname, '../build/Client/styles')));

var strategyOptions = {
    usernameField: 'email',
    passReqToCallback: true
}

var loginStrategy = new localStrategy(strategyOptions, function(req, email, password, done) {
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
        // else {
        //     return done(null, false, {message: 'Username or Password is incorrect'});
        // }
    })
});

var registerStrategy = new localStrategy(strategyOptions, function(req, email, password, done){
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
passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

function createSendToken(req, res, user){
    var payload = {
        iss: req.hostname,
        sub: user.id
    }
    var token = jwt.encode(payload, CONFIG.jwt_secret);
    res.status(200).send({
        dataRedirect: 'dashboard',
        user: user.toJSON(user),
        token: token
    })
};

app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req, res, req.user);
});

app.post('/signup', passport.authenticate('local-register'), function(req, res){
    createSendToken(req, res, req.user);
});

var profile = [
    'name',
    'firstName',
    'lastName'
];

app.get('/profile', function(req,res){

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, CONFIG.jwt_secret);

    if(!payload.sub){
        res.status(401).send({
            message: 'Not Authorized to access this resource'
        })
    }

    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'You are not authorized to access this resource'
        });
    } 

    res.send(profile);
    
})

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/Client/index.html'));
});


app.listen(3000, function(){
    console.log("Express Server running at port 3000!");
});