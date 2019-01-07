let path = require('path');
let express = require('express');
let app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let students = [ { name: 'Moshe Zuchmir', age:  23 , field: 'Computers'  },
                 { name: 'Ali Mali',     age:  25      , field: 'Phyzics'  },
                 { name: 'Chris Owen',     age:  28      , field: 'Cooking'  },
                 { name: 'Alisha Bauer',     age:  25      , field: 'Computers'  },
                 { name: 'Bobi Brown',     age:  35      , field: 'Computers-Cooking'  },
                 { name: 'Bobi "not-so" Brown',     age:  18      , field: 'none'  },
                 { name: 'Shloymale',     age:  20      , field: 'Electrics?'  },
                 { name: 'Coocli Ada',     age:  22      , field: 'Computers'  },
                 { name: 'Dani Din',     age:  25      , field: 'phyzics'  },
                 { name: 'Natan Le',      age: 33  ,field: 'karate'       }
               ];
    let line = "Now We will present to you our students (): ";
  res.render('index', { students: students, tagline: line });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.listen(8080, function () {
  console.log('Listening on port 8080!');
});
