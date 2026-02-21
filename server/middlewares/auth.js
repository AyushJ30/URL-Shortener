const { getUser } = require("../services/auth");

function checkAuthentication(req, res, next){
    const token = req.cookies.token;
    req.user = null;

    if(!token){
        return next();
    }

    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles){
    return function (req, res, next){
        if(!req.user){
            return res.send('Login');
        }

        if(roles.includes(req.user.role)){
            next();
            return;
        } else{
            return res.end('Un-Authorized');
        }
    }
}

module.exports = {
    checkAuthentication,
    restrictTo
}