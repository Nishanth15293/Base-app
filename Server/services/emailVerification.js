var _ = require('underscore');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/userModel');

var model = {
	verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
	title: 'Athelli',
	subTitle: 'Thanks for signing up!',
	body: 'please Verify your account by clicking the button below'
}


exports.send = function(email){
	 var payload = {
        sub: email
    }

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    // var transporter = nodemailer.createTransport(smtpTransport({
    // 	host:''
    // }))
   	var transporter = nodemailer.createTransport('smtps://web.dev15293%40gmail.com:webdev15293@smtp.gmail.com');

	// setup e-mail data with unicode symbols 
	var mailOptions = {
	    from: '"WEb Dev 👥" <nishanth@athelli.com>', // sender address 
	    to:  email + ',' +'777.nishanth@gmail.com', // list of receivers 
	    subject: 'Account Verification ✔', // Subject line 
	    // text: 'Hello world 🐴', // plaintext body 
	    html: getHtml(token) // html body 
	};
	 
	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	console.log(error);
	        return res.status(500, error);
	    }
	    console.log('Message sent: ' + info.response);
	});


}

exports.handler = function(req, res){
	var token = req.query.token;
	var payload = jwt.decode(token, config.EMAIL_SECRET);
	var email = payload.sub;

	if(!email) return handleError(res);

	User.findOne({email: email}, function(err, foundUser){
		if(err) return res.status(500);

		if(!foundUser) return handleError(res);

		if(!foundUser.active){
			foundUser.active = true;
		}

		foundUser.save(function(err){
			if(err) return res.status(500);

			return res.redirect(config.APP_URL);
		})


	})
}

function getHtml(token){
	var path = './views/basic1.html';
	var html = fs.readFileSync(path, encoding='utf8');

	var template = _.template(html);
	model.verifyUrl += token;

	return template(model);
}

function handleError(res){
	return res.status(401).send({
		message: 'Authentication Failed, Unable to verify the email.'
	});
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};