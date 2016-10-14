var request = require('request');
var qs = require('querystring');
var createSendToken = require('./../services/jwt');
var config = require('./../services/config');
var User = require('./../models/userModel');

module.exports = function(req, res){
	var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/me';

	var params = {
		client_id : req.body.clientId,
		redirect_uri : req.body.redirectUri,
		client_secret : config.FACEBOOK_SECRET,
		code : req.body.code
	};

	request.get({url: accessTokenUrl, qs: params}, function(err, response, accessToken){
		var accessToken = qs.parse(accessToken);

		request.get({url: graphApiUrl, qs: accessToken, json: true}, function(err, response, profile){
			console.log(profile);
			User.findOne({facebookId: profile.id}, function(err, existingUser){
				if(existingUser){
					return createSendToken(req, res, existingUser);
				}

				var newUser = new User();
				newUser.facebookId = profile.id;
				newUser.displayName = profile.name;
				newUser.save(function(err){
					createSendToken(req, res, newUser);
				});
			})
		})
	})
}