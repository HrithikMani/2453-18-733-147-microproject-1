const config = require("./config.js")
const jwt = require("jsonwebtoken")
var checkToken = function(req,res,next){
    var head = req.headers['authorization'];
    if(typeof head !== 'undefined'){
        var token = head.split(" ");
        jwt.verify(token[1],config.secret,function(err,auth){
            if(err){
                res.sendStatus(403)
            }else{
                next();
            }
        });
    }else{
        res.sendStatus(403);
    }
}
module.exports = {checkToken:checkToken};