const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const engines = require('consolidate');

const app = express();

const users = []

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
  if (err) { throw err; }
  JSON.parse(data).forEach((user) => {
    user.name.full = _.startCase(`${user.name.first} ${user.name.last}`)
    users.push(user)
  });
});

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', { users: users });
});

app.get('/:username', (req, res) => {
  const username = req.params.username;
  res.send(username);
});

const server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});
