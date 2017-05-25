/**
 * Created by Nishanth on 8/30/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url);
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var jwt = require('jwt-simple');
var config = require('./services/config');
var passport = require('passport');
var googleAuth = require('./routes/googleAuth');
var facebookAuth = require('./routes/facebookAuth');
var createSendToken = require('./services/jwt');
var localStrategy = require('./services/localStrategy');
var profile = require('./routes/profile');
var emailVerification = require('./services/emailVerification');
var Item = require('./models/itemModel');
var User = require('./models/userModel');


// emailVerification.send('fake@fake.com');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
})

app.use('/js', express.static(path.resolve(__dirname, '../build/Client/js')));
app.use('/styles', express.static(path.resolve(__dirname, '../build/Client/styles')));

passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);

app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req, res, req.user);
});

app.post('/signup', passport.authenticate('local-register'), function(req, res){
    emailVerification.send(req.user.email);
    createSendToken(req, res, req.user);
});

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/auth/facebook', facebookAuth);

app.get('/profile',profile);

app.post('/auth/google', googleAuth);

require('./routes/item.js')(app);
require('./routes/group.js')(app);

app.put('/api/adduser/:user_id/:group_id', function(req, res){
    var groupId = req.params.group_id;
    var userId = req.params.user_id;

    User.findByIdAndUpdate(
    userId,
    {$push: {groups: groupId}},
    {new: true},
    function(err, user) {
       if(err) res.send(err);

       res.json(user);
    });

})

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/Client/index.html'));
});

app.listen(3000, function(){
    console.log("Express Server running at port 3000!");
});