var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');


module.exports = function(req, res, user){
    var payload = {
        iss: req.hostname,
        sub: user.id,
        exp: moment().add(2, 'days').unix()
    }

    var token = jwt.encode(payload, config.JWT_SECRET);
    res.status(200).send({
        dataRedirect: 'dashboard',
        user: user.toJSON(user),
        token: token
    })
};