require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function setUser(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, secret,{expiresIn:"1d"});
} 
 
function getUser(token){
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token, secret);
    } catch(err){
        console.log('Error: ', err);
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
};