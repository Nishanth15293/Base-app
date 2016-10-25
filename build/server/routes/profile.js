var jwt = require('jwt-simple');

module.exports =  function(req,res){

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
    
};