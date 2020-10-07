const express = require("express")
const bodParser = require("body-parser")
const config = require("./config.js")
const app= express()
const jwt= require("jsonwebtoken")
let fir = require('./first.js')
app.use(bodParser.urlencoded({extended:true}));
app.use(bodParser.json());

app.post("/login",function(req,res){
    var a = req.body.username;
    var b = req.body.password;
    if(a == "admin" && b=="password"){
        jwt.sign({user:{'username':a,'password':b}},config.secret,function(err,token){
            if(err){
                res.sendStatus(403);
            }else{
                res.json({
                    message:"login succefully",
                    token
                });
            }   
        });
    }else{
        res.sendStatus(403);
    }

});

app.listen(3000)