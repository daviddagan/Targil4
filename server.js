let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let db = require("./database.json");
let loginFlag = false,
    managerFlag = false;
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let line = "Now We will present to you our students (): ";
    res.render('index', {tagline: line, loginFlag, managerFlag});
});

app.post("/branchUpd/:id", function (req, res) {
   let name = req.body.name;
   let city = req.body.city;
   var id = req.params.id;
   leng = db.branch.length;
   var branchExists='false';
   if(id!== name){
   for (var i = 0 ; i<leng; i++){
    if(db.branch[i].name === name ) {
       branchExists='true';
    }
  }
}
  if(branchExists==='false'){
   for (var i = 0 ; i<leng; i++){
    if(db.branch[i].name === id) {
      db.branch[i].name=name;
      db.branch[i].city=city;

    }
   
  }
  res.send({});
  }
});
app.post("/branchAdd", function (req, res) {
    let name = req.body.name;
    let city = req.body.city;
    leng = db.branch.length;
    var branchExists='false';
    for (var i = 0 ; i<leng; i++){
     if(db.branch[i].name === name) {
        branchExists='true';
     }
   }
   if(branchExists==='false'){
  db.branch.push({name: name,city: city,flag: "true",active :"true"});
  res.send({});
}
});
app.get('/branchDel/:id', function (req, res) {
  var id = req.params.id;
  leng = db.branch.length;
  var seccuss='false';
  for (var i = 0 ; i<leng; i++){
    if(db.branch[i].name === id) {
      db.branch[i].active='false';
      seccuss='true';
    }
    if(seccuss==='true'){
    res.send({});
}
  }

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
app.get("/branch",function (req, res) {
  let branch = db.branch;
    res.render('branch',{branches : branch });
});
app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
