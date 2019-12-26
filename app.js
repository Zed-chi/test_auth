var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');
var app = express();


/* uses */
app.use(morgan('short'));
app.use(express.static(__dirname + '/static'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* routes */

app.get('/', function(req, res) {
    db.all("select * from users",(err,rows)=>{
        console.log(rows);
        res.json({rows:rows});
    });    
});

app.get("/user", (req, res)=>{
    db.get("select * from users where id = $id", (err,row)=>{        
        res.json({row:row});
    });    
});

app.post("/user", (req, res)=>{    
    var email = req.body.email;
    var password = req.body.password;
    if (!email){}
    if (!password){}

    db.run('INSERT INTO users (email, password) VALUES ($email, $password)', {
        $email: email,
        $password: 
      }, function(error) {        
        console.log(error);
    });
});

app.get("/user/:id", (req, res)=>{
    db.get("select * from users where id = $id", (err,row)=>{        
        res.json({row:row});
    });
});

app.put("/user/:id", (req, res)=>{
    req
    db.run('INSERT INTO users (email, password, info) VALUES ($email, $password, $info)', {
        $email: newRow.location,
        $password: newRow.year
      }, function(error) {        
        console.log(error);
    });
});

app.delete("/user/:id", (req, res)=>{
    db.run('INSERT INTO TemperatureData (location, year) VALUES ($location, $year)', {
        $location: newRow.location,
        $year: newRow.year
      }, function(error) {
        // handle errors here!
      
        console.log(this.lastID);
      });
});

/* stuff */
app.listen(3000);