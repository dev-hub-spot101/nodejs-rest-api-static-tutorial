var express = require('express');
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app  =  express();
const Users = [
    {
        id:1,
        name:"dev",
        email:"dev@gmail.com"
    },
    {
        id:2,
        name:"hub",
        email:"hub@gmail.com"
    },
    {
        id:3,
        name:"spot",
        email:"spot@gmail.com"
    },
    {
        id:4,
        name:"ben",
        email:"ben@gmail.com"
    },
    {
        id:5,
        name:"jhon",
        email:"jhon@gmail.com"
    },
    {
        id:6,
        name:"youtube",
        email:"youtube@gmail.com"
    },
    {
        id:7,
        name:"google",
        email:"google@gmail.com"
    },
    {
        id:8,
        name:"twitter",
        email:"twitter@gmail.com"
    }
];

//allow cros origin requests
app.all('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
    next();
});
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//root path
app.get('/', (req, res, next) =>{
    res.send("Nodejs Express sever started...")
});

//get all users
app.get('/users', (req, res, next)=>{
    res.json({
        "data":Users,
        "message":"Users fetch succesfully",
        "status":true
    })
});

//get all users by id
app.get('/users/:id', (req, res, next)=>{
    var find = Users.find(el=>el.id == req.params.id);
    if(find){
        res.json({
            "data":find,
            "message":"User fetch succesfully",
            "status":true
        })
    }else{
        res.json({
            "data":{},
            "message":"User not found",
            "status":false
        }) 
    }
});

//Create user
app.post('/users', (req, res, next)=>{
    console.log(req.body, "object here");
    Users.push(req.body);
    res.json({
        "data":Users,
        "message":"Users fetch succesfully",
        "status":true
    })
});

//update user name by id
app.put('/users/:id', (req, res, next)=>{
    console.log(req.body, "object here");
    var find = Users.find(el=>el.id == req.params.id);
    if(find){
        find['name'] = req.body.name; 
        res.json({
            "data":find,
            "message":"User fetch succesfully",
            "status":true
        })
    }else{
        res.json({
            "data":{},
            "message":"User not found",
            "status":false
        }) 
    }
});

//delete by id
app.delete('/users/:id', (req, res, next)=>{
    var find = Users.find(el=>el.id == req.params.id);
    if(find){
        let index = Users.indexOf(find);
        Users.splice(index, 1);
        res.json({
            "data":Users,
            "message":"User fetch succesfully",
            "status":true
        })
    }else{
        res.json({
            "data":{},
            "message":"User not found",
            "status":false
        }) 
    }
});


app.listen(8699, ()=>{
    console.log("server running on port 8699")
})

