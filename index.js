const express = require('express');
const app = express();
const port = 3000;

var users = [{
    name : 'John',
    kidneys : [{
        healthy : false
    }]
}];

app.use(express.json());

app.get('/', function(req, res) {
    const johnKed = users[0].kidneys;
    const numOfKed = johnKed.length;
    let noOfHealthy = 0;
    for (let i=0; i<numOfKed; i++) {
        if (johnKed[i].healthy) {
            noOfHealthy+=1;
    }}
    const noOfUnhealthy = numOfKed - noOfHealthy;
    res.json({
        numOfKed,
        noOfHealthy,
        noOfUnhealthy
    });
});

app.post('/', function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Kidney Added"
    });
});


app.put('/', function(req,res) {
    if(checkForUnhealthyKids()){
        for( var i=0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg:" Unhealthy Kidneys healed "
        });
    }else{
        res.status(411).json({
            msg:"All the kidneys are healthy"
        });
    }
});

app.delete('/', function(req,res) {
    let newKids = [];
    if(checkForUnhealthyKids()){
        for( var i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy == true){
                newKids.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKids;
        res.json({});
    }else{
        res.status(411).json({
            msg:"All the kidneys are healthy"
        });
    }
});

function checkForUnhealthyKids(){
    for( var i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy == false){
            return true;
        }
    }
}

app.listen(port);