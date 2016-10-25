var request = require('request');
var qs = require('querystring');
var createSendToken = require('./../services/jwt');
var config = require('./../services/config');
var User = require('./../models/userModel');

module.exports = function(req, res){
	var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'birthday', 'about', 'cover', 'gender', 'hometown', 'education','relationship_status'];
	var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/me?fields='+fields.join(',');
	console.log(graphApiUrl);
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
			// var query = or:{facebookId: profile.id, email: profile.email    
				//query for both id and email,
				//if found same email as profile.email add facebooks profile.id to it...
			User.findOne({facebookId: profile.id}, function(err, existingUser){
				if(existingUser){
					if(profile.email){

					}
					return createSendToken(req, res, existingUser);
				}

				var newUser = new User();
				newUser.facebookId = profile.id;
				newUser.displayName = profile.name;
				newUser.firstName = profile.first_name;
				newUser.lastName = profile.last_name;
				newUser.fbLink = profile.link;
				newUser.fbImageUrl =  'https://graph.facebook.com/' + profile.id + '/picture?type=large';
				newUser.save(function(err){
					createSendToken(req, res, newUser);
				});
			})
		})
	})
}