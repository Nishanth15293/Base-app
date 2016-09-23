/**
 * Created by Nishanth on 8/30/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var User = require('./models/userModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/js', express.static(path.resolve(__dirname, '../build/Client/js')));
app.use('/styles', express.static(path.resolve(__dirname, '../build/Client/styles')));
//app.use('/bower_components', express.static(path.resolve(__dirname, '../bower_components')));



mongoose.connect('mongodb://localhost:27017/angular2');


app.post('/login', function(req, res){
    var payload = req.body;
    console.log(payload);
    console.log(req.body);

    var email = payload.email;
    var password = payload.password;
    var query = {email : email};
    User.findOne(query, function(err,user) {
        // console.log("searchign please wait!");
        if (err) throw err;

        if (!user) {
            console.log("user not found"); // send json obj stating this msg later
        }
        else if (user) {
            if (user.password == password) {
                //var token = jwt.sign(user, app.get('superSecret'),{expiresIn:3600});

                console.log("password match");
                res.send({redirect: 'home', firstName: user.firstName});
            }
        }
        else {
            console.log("passwords did not match");
            console.log(email);
            res.send({errorMessage: 'Username or Password is incorrect'});
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
    console.log(user);
    user.save(function(err){
        if(err){
            res.send(err);
        }
        else {
            console.log('user saved sucess!');
            res.send({dataRedirect: 'login'});
        }
    });

});

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/Client/index.html'));
});


app.listen(3000, function(){
    console.log("Express Server running at port 3000!");
});