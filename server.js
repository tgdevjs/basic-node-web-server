const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log.');
  });
  next();
});

// Maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Static
app.use(express.static(__dirname + '/public'));

// Register helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'HomePage',
    welcomeMessage: 'Welcome to the Home Page!',
    currentYear: new Date().getFullYear()
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'AboutPage',
    currentYear: new Date().getFullYear()
  });
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'ProjectsPage',
    projectsMessage: 'Portfolio goes here.',
    currentYear: new Date().getFullYear()
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
