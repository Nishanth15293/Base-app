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
var config = require('./services/config');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var request = require('request');
var facebookAuth = require('./routes/facebookAuth');
var createSendToken = require('./services/jwt');


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

app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req, res, req.user);
});

app.post('/signup', passport.authenticate('local-register'), function(req, res){
    createSendToken(req, res, req.user);
});

app.post('/auth/facebook', facebookAuth);

var profile = [
    'name',
    'firstName',
    'lastName'
];

app.get('/profile', function(req,res){

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.jwt_secret);

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

app.post('/auth/google', function(req, res){
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type : 'authorization_code',
        client_secret: 'E6RkvKbJRNP4e3aoPGi9LzOK'
    }

    var url = 'https://www.googleapis.com/oauth2/v4/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me';
    request.post(url, {
        json : true, 
        form : params
    }, function(err, response, token){
        var accessToken = token.access_token;
        var headers = {
            Authorization : 'Bearer ' + accessToken
        }

        request.get({
            url: apiUrl,
            json: true, 
            headers: headers
        }, function(err, response, profile){
            User.findOne({googleId:profile.id}, function(err, foundUser){
                if(err) throw err;

                if(foundUser){
                    return createSendToken(req, res, foundUser);
                }

                var newUser = new User();
                newUser.googleId = profile.id;
                newUser.firstName = profile.name.givenName;
                newUser.lastName = profile.name.familyName;
                newUser.displayName = profile.displayName;
                newUser.googleImageUrl = profile.image.url;
                newUser.gmail = profile.emails[0].value;
                //can get other data as profile.emails.value, profile.tagline, profile.image.url 

                newUser.save(function(err){
                    if(err){
                        return next(err);  
                    } 

                    createSendToken(req, res, newUser);
                })
            })
        })
    });
})

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/Client/index.html'));
});


app.listen(3000, function(){
    console.log("Express Server running at port 3000!");
});