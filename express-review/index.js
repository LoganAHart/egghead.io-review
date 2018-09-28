const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const JSONStream = require('JSONStream');


const helpers = require('./helpers');
const userRoute = require('./username');

const app = express();

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/profilepics', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => {
  res.end();
});

app.get('/', (req, res) => {
  const users = [];
  fs.readdir('users', (err, files) => {
    if (err) { throw err; }
    files.forEach((file) => {
      fs.readFile(path.join(__dirname, 'users', file), {encoding: 'utf8'}, (err, data) => {
        const user = JSON.parse(data);
        user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
        users.push(user);
        if (users.length === files.length) {
          res.render('index', { users: users });
        }
      });
    });
  });
});

app.get('*.json', (req, res) => {
  res.download('./users/' + req.path, 'extension');
});

app.get('/data/:username', (req, res) => {
  const username = req.params.username;
  const readable = fs.createReadStream(`./users/${username}.json`)
  readable.pipe(res);
});

app.get('users/by/:gender', (req, res) => {
  const gender = req.params.gender;
  const readable = fs.createReadStream('./users.json');
  //not working... same as tutorial, look at docs
  readable
    .pipe(JSONStream.parse('*', (user) => {
      if (user.gender === gender)  { return user.name; }
    }))
    .pipe(JSONStream.stringify('[\n  ', ',\n  ', '\n]\n'))
    .pipe(res);
});

app.get('/error/:username', (req, res) => {
  res.status(404).send(`No user named ${req.params.username} found.`);
});

app.use('/:username', userRoute);

const server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});
