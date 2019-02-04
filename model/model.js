let db = require("../database.json");
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
db.user.supplier.map(function(obj){
    obj.role ="supplier";
    return obj;
});

function modifyBooleans(arr){
    arr.forEach(function (user) {
        user.active= (user.active ==='true');
    })
}
for (let arr in db.user){
    if(db.user.hasOwnProperty(arr)){
        modifyBooleans(db.user[arr]);
    }
}
module.exports = db;