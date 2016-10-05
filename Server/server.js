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
var localStrategy = require('passport-local').strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.user(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
})

app.use('/js', express.static(path.resolve(__dirname, '../build/Client/js')));
app.use('/styles', express.static(path.resolve(__dirname, '../build/Client/styles')));

var strategy = new localStrategy();

passport.use(strategy);

function createSendToken(req, res, user){
    var payload = {
        iss: req.hostname,
        sub: user.id
    }
    console.log(CONFIG.jwt_secret);
    var token = jwt.encode(payload, CONFIG.jwt_secret);
    res.status(200).send({
        dataRedirect: 'dashboard',
        user: user.toJSON(user),
        token: token
    })
};

app.post('/login', function(req, res){
    var payload = req.body;
    var email = payload.email;
    var password = payload.password;
    var query = {email : email};
    User.findOne(query, function(err,user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({message : 'User Email not found!'});
        }
        else if (user) {

            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;

                if(isMatch){
                    createSendToken(req, res, user);
                }

                if(!isMatch){
                    return res.status(401).send({message : 'Incorrect Password! Please Try Again!'});
                }
            });
        }
        else {
            res.status(401).send({errorMessage: 'Username or Password is incorrect'});
        }
    })

});

app.post('/signup', function(req, res){
    var payload = req.body;
    var user = new User({
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : payload.email,
        password : payload.password
    });
    user.save(function(err){
        if(err){
            res.send(err);
        }
        else {
            console.log('user saved sucess!');
            createSendToken(req, res, user);
        }
    });

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