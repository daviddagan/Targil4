let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let db = require("./model/model.js");
let loginFlag = false,
    managerFlag = false;

function getDetailsById(id) {
    let users = [].concat(db.user.manager).concat(db.user.worker).concat(db.user.client);
    let tempUser;
    users.forEach(function (user) {
        if (id === user.name)
            tempUser = user;
    });
    return tempUser;
}
function log(){
    console.log(...arguments);
}
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    let line = "Now We will present to you our students (): ";
    res.render('index', {tagline: line, loginFlag, managerFlag});
});
function objIsExists(nameObj, name) {

    let leng;
    if (nameObj === "manager") {
        leng = db.user.manager.length;
        for (var i = 0; i < leng; i++) {
            if (db.user.manager[i].name === name) {
                return 'true';
            }
        }
        return 'false';
    } else if (nameObj === "client") {
        leng = db.user.client.length;
        for (var i = 0; i < leng; i++) {
            if (db.user.client[i].name === name) {
                return 'true';
            }
        }
        return 'false';
    }
    else if (nameObj === "worker") {
        leng = db.user.worker.length;
        for (var i = 0; i < leng; i++) {
            if (db.user.worker[i].name === name) {
                return 'true';
            }
        }
        return 'false';
    }
    else if (nameObj === "supplier") {
        leng = db.user.supplier.length;
        for (var i = 0; i < leng; i++) {
            if (db.user.supplier[i].name === name) {
                return 'true';
            }
        }
        return 'false';
    }

}
function clientUpdate(id,user) {

    let name = user.name;
    let password = user.password;
    let favorite = user.favorite;
    let phone = user.phone;

    let leng = db.user.client.length;

    for (var i = 0; i < leng; i++) {
        if (db.user.client[i].name === id) {
            db.user.client[i].password = password;
            db.user.client[i].name = name;
            db.user.client[i].favorite = favorite;
            db.user.client[i].phone = phone;
            db.user.client[i].active='true';
            return 'true';

        }
    }
    return 'false';

}
function supplierUpdate(id,user) {

    let name = user.name;
    let company = user.company;
    let rating = user.rating;
    let frequency = user.frequency;


    let leng = db.user.supplier.length;

    for (var i = 0; i < leng; i++) {
        if (db.user.supplier[i].name === id) {
            db.user.supplier[i].company = company;
            db.user.supplier[i].name = name;
            db.user.supplier[i].rating = rating;
            db.user.supplier[i].frequency = frequency;
            db.user.supplier[i].active='true';
            return 'true';

        }
    }
    return 'false';

}
function workerUpdate(id,user) {

    let name = user.name;
    let password = user.password;
    let phone = user.phone;
    let salary = user.salary;
    log("name" , name);
    log("password" , password);
    log("phone" , phone);

    let leng = db.user.worker.length;
    log("in before");
    for (var i = 0; i < leng; i++) {
        if (db.user.worker[i].name === id) {
            log("in name:",name);
            db.user.worker[i].name = name;
            db.user.worker[i].password = password;
            db.user.worker[i].phone = phone;
            db.user.worker[i].salary = salary;
            db.user.worker[i].active='true';
            return 'true';

        }
    }
    return 'false';
}
function managerUpdate(id,user) {

    let name = user.name;
    let password = user.password;
    let branch = user.branch;
    let age = user.age;
    let rank = user.rank;

    let leng = db.user.manager.length;

    for (var i = 0; i < leng; i++) {
        if (db.user.manager[i].name === id) {
            db.user.manager[i].name = name;
            db.user.manager[i].password = password;
            db.user.manager[i].branch = branch;
            db.user.manager[i].age = age;
            db.user.manager[i].rank = rank;
            db.user.manager[i].active='true';
            return 'true';

        }
    }
    return 'false';

}
function clientDel(id) {
    let name = id;
    let leng = db.user.client.length;
    var success = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.client[i].name === name) {
            db.client[i].active = 'false';
            success = 'true';
        }
        if (success === 'true') {
            return 'true';
        }
    }
    return 'false';

}
function supplierDel(id) {

    let name = id;
    let leng = db.user.supplier.length;
    var seccuss = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.supplier[i].name === name) {
            db.supplier[i].active = 'false';
            seccuss = 'true';
        }
        if (seccuss === 'true') {
            return 'true';

        }
    }
    return 'false';


}
function workerDel(id) {

    log('here');
    let name = id;
    let leng = db.user.worker.length;
    var success = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.worker[i].name === name) {
            db.worker[i].active = 'false';
            success = 'true';
        }
        if (success === 'true') {
            return 'true';


        }
    }

    return 'false';
}
function managerDel(id) {

    log("first in");
    let name = id;
    let leng = db.user.manager.length;
    var seccuss = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.manager[i].name === name) {
            log("in in");
            db.manager[i].active = 'false';
            seccuss = 'true';
        }
        if (seccuss === 'true') {
            return 'true';

        }
    }
    return 'false';

}
app.post('/userDel/:id', function (req, res) {

    let success ='false';
    var id = req.params.id;
    var ObjExists = 'false';
    let role = req.body.role;
    if (role === "manager") {
        ObjExists = objIsExists("manager", id);
        if (ObjExists !== 'false')
            success = managerDel(id);

    } else if (role === "worker") {
        ObjExists = objIsExists("worker", id);
        if (ObjExists !== 'false')
            success = workerDel(id);
    } else if (role === "supplier") {
        ObjExists = objIsExists("supplier", id);
        if (ObjExists !== 'false')
            success =  supplierDel(id);
    }
    else if (role === "client") {
        ObjExists = objIsExists("client", id);
        if (ObjExists === 'false')
            success = clientDel(id);
    }

    if(success==='true')
    {
        res.send({});
    }
    else
        throw new Error('error');
});
app.post("/userUpd/:id", function (req, res) {
    let name = req.body.name;
    var id = req.params.id;
    var body = req.body;
    let success= 'false';
    leng = db.branch.length;
    var ObjExists = 'false';

    let role = req.body.role;
    log("role:",role);
    if (role === "manager") {
        ObjExists = objIsExists("manager", name);
        if (ObjExists === 'false')
            success = managerUpdate(id,body);

    } else if (role === "worker") {
        ObjExists = objIsExists("worker", name);
        if (ObjExists === 'false')
            success=workerUpdate(id,body,function (){
                res.send({});});
    } else if (role === "supplier") {
        ObjExists = objIsExists("supplier", name);
        if (ObjExists === 'false')
            success = supplierUpdate(id,body);
    }
    else if (role === "client") {
        ObjExists = objIsExists("client", name);
        if (ObjExists === 'false')
            success = clientUpdate(id,body);
    }

    if(success==='true')
    {
        res.send({});
    }
    else
        throw new Error('error');

});
app.post("/userAdd", function (req, res) {
    let name = req.body.name;
    let city = req.body.city;
    leng = db.branch.length;
    var branchExists = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.branch[i].name === name) {
            branchExists = 'true';
        }
    }
    if (branchExists === 'false') {
        db.branch.push({name: name, city: city, flag: "true", active: "true"});
        res.send({});
    }
});
app.post("/branchUpd/:id", function (req, res) {
    let name = req.body.name;
    let city = req.body.city;
    var id = req.params.id;
    leng = db.branch.length;
    var branchExists = 'false';
    if (id !== name) {
        for (var i = 0; i < leng; i++) {
            if (db.branch[i].name === name) {
                branchExists = 'true';
            }
        }
    }
    if (branchExists === 'false') {
        for (var i = 0; i < leng; i++) {
            if (db.branch[i].name === id) {
                db.branch[i].name = name;
                db.branch[i].city = city;

            }

        }
        res.send({});
    }
});
app.post("/branchAdd", function (req, res) {
    let name = req.body.name;
    let city = req.body.city;
    leng = db.branch.length;
    var branchExists = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.branch[i].name === name) {
            branchExists = 'true';
        }
    }
    if (branchExists === 'false') {
        db.branch.push({name: name, city: city, flag: "true", active: "true"});
        res.send({});
    }
});
app.get('/branchDel/:id', function (req, res) {
    var id = req.params.id;
    leng = db.branch.length;
    var seccuss = 'false';
    for (var i = 0; i < leng; i++) {
        if (db.branch[i].name === id) {
            db.branch[i].active = 'false';
            seccuss = 'true';
        }
        if (seccuss === 'true') {
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
            res.send(JSON.stringify({"message": "manager"}));
            managerFlag = true;
            loginFlag = true;
            flag = true;
        }
    });
    let users = empty.concat(db.user.worker).concat(db.user.client);
    users.forEach(function (item) {
        if (item.name === username && item.password === password) {
            res.send(JSON.stringify({"message": "user"}));
            loginFlag = true;
            flag = true;
        }
    })
    if (!flag) {
        res.send(JSON.stringify({"message": "not user"}));
    }
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/reset', function (req, res) {
    loginFlag = false;
    managerFlag = false;
    res.send("done!")
});
app.get("/contact", function (req, res) {
    res.render('contact');
});
app.get("/users", function (req, res) {
    res.render('users', {db});
});
app.get("/users/get/:id", function (req, res) {
    var userDetails = {};
    userDetails = getDetailsById(req.params.id);
    res.send(userDetails);
})

app.get("/flowers", function (req, res) {
    res.render("flowers", {flower: db.flower});
});
app.get("/branch", function (req, res) {
    let branch = db.branch;
    res.render('branch', {branches: branch});
});
// app.use("*", function (req, res) {
//     res.render("index", {tagline: "", loginFlag, managerFlag});
// });

app.listen(8080, function () {
    console.log('Listening on port 8080!');
    console.log("http:\\\\localhost:" + 8080);
});
