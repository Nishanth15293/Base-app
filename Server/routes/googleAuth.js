var User = require('../models/userModel');
var request = require('request');
var createSendToken = require('../services/jwt');
var config = require('./../services/config');

module.exports = function(req, res){
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type : 'authorization_code',
        client_secret: config.GOOGLE_SECRET
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
};