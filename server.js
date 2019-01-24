let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let db = require("./database.json");
db.user.manager.map(function(obj){
obj.role ="manager";
    return obj;
});
db.user.client.map(function(obj){
obj.role ="client";
    return obj;
});
db.user.worker.map(function(obj){
obj.role ="worker";
    return obj;
});
let loginFlag = false,
    managerFlag = false;
function getDetailsById(id){
    let users = [].concat(db.user.manager).concat(db.user.worker).concat(db.user.client);
    let tempUser;
    users.forEach(function(user){
        if(id===user.name)
        tempUser = user;
    })
    return tempUser;
}
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let line = "Now We will present to you our students (): ";
    res.render('index', {tagline: line, loginFlag, managerFlag});
});
app.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let empty = [];
    let managers = db.user.manager;
    let flag = false;
    managers.forEach(function (manager) {
        if (manager.name === username && manager.password === password) {
            res.send(JSON.stringify({"message":"manager"}));
            console.log("manager");
            managerFlag = true;
            loginFlag = true;
            flag = true;
        }
    });
    let users = empty.concat(db.user.worker).concat(db.user.client);
    users.forEach(function (item) {
        if (item.name === username && item.password === password) {
            res.send(JSON.stringify({"message":"user"}));
            loginFlag = true;
            flag = true;
        }
    })
    if (!flag) {
        console.log({"message":"not user"});
        res.send(JSON.stringify({"message":"not user"}));
    }
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/reset', function (req, res){
    loginFlag = false;
    managerFlag = false;
    res.send("done!")
});
app.get("/contact",function (req, res) {
    res.render('contact');
});

app.get("/users",function (req, res) {
    res.render('users',{db});
});
app.get("/users/get/:id",function(req,res){
    var userDetails = {};
    userDetails = getDetailsById(req.params.id); 
    console.log("user details"+userDetails);   
    res.send(userDetails);
})

app.get("/flowers",function (req,res) {
    res.render("flowers",{flower:db.flower});
});
app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
