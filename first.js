var express = require("express")
var app = express()
var middleware = require("./middleware.js")

app.post('/api',middleware.checkToken,function(req,res){
            res.json({message:"Hello"});
});


var mongo = require("mongodb");
let db;
mongo.MongoClient.connect("mongodb://localhost:27017/",function(err,cursor){
    db= cursor.db("Hospital1");
    console.log("DataBase connected");
});
//would give all hospital details
app.get("/hosNames",middleware.checkToken,function(req,res){
   
            db.collection("Hospital").find({}).toArray(function(err,data){
                res.send(data);
            });
});
//would give all the ventilators which are free in all hospitals
app.get("/hosFreeVent",middleware.checkToken,function(req,res){
     db.collection("Ventilaors").find({status:"free"}).toArray(function(err,data){
                res.send(data);
            });
        
});
//would return all the ventilators whcih are occupied
app.get("/hosOccVent",middleware.checkToken,function(req,res){
            db.collection("Ventilaors").find({status:"occupied"}).toArray(function(err,data){
                res.send(data);
            });
});

//would return ventilators which are free or occupied in a particular hospital
app.get("/hosParticular",middleware.checkToken,function(req,res){
    var a =req.query.hId
    var b =req.query.occ
        db.collection("Ventilaors").find({hId:a,status:b}).toArray(function(err,data){
                res.send(data);
            });
        
});

//adding values to the database
app.post("/add",middleware.checkToken,function(req,res){
    var a = req.query.hId;
    var b = req.query.name;
    var c = req.query.ventId;
    var d = "free";
    var x = {"hId":a,"ventId":c,"name":b,"status":d};
        db.collection("Ventilaors").insertOne(x,function(err,r){
                res.send("Added Successfully");
            });
        
});
// updating the ventilator
app.post("/update",middleware.checkToken,function(req,res){
    var a = req.query.status;
    var c = req.query.ventId;
    var d = {"ventId":c};
    var x = {$set:{"status":a}};
        db.collection("Ventilaors").updateOne(d,x,function(err,r){
                res.send("Updated Successfully");
            });
        
});


// updating the ventilator
app.post("/delete",middleware.checkToken,function(req,res){
    var a = req.query.id;
    var b = mongo.ObjectID(a);
    
            db.collection("Ventilaors").deleteOne({_id:b},function(err,r){
                res.send("Deleted Successfully");
            });
});
//search hospital by name
app.post("/searchName",middleware.checkToken,function(req,res){
    var a = req.query.name;
    jwt.verify(req.token,scKey,function(err,auth){
        if(err){
            res.sendStatus(403);
        }else{
            db.collection("Ventilaors").find({name: new RegExp(a,'i')}).toArray().then(result=>res.json(result));
        }
    });
    
});



app.listen(8080);   
