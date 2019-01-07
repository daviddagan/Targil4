let path = require('path');
let express = require('express');
let app = express();
let db = require("./database.json");
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let line = "Now We will present to you our students (): ";
    res.render('index', {tagline: line });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.listen(8080, function () {
  console.log('Listening on port 8080!');
});
