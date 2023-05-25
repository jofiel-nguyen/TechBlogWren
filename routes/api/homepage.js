const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
module.exports = function(app) {
  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  });

  // Set the view engine to use Handlebars
  // Set the view engine to use Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', '..', 'views'));



  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage using the "homepage.handlebars" template
    res.render('homepage', {
      title: 'The Tech Blog',
      components: [
        { name: 'Model', description: 'Represents the data and business logic of the application.' },
        { name: 'View', description: 'Handles the presentation and user interface.' },
        {
          name: 'Controller',
          description: 'Acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.'
        }
      ]
    });
  });
};
