const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Comment = require('../../models/comment');
module.exports = function(app) {
  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  });

  // Set the view engine to use Handlebars
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '..', '..', 'views'));

  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage using the "homepage.handlebars" template
    const username = req.session.user ? req.session.user.username : null;

    res.render('homepage', {
      title: 'The Tech Blog',
      components: [
        { name: 'Model', description: 'Represents the data and business logic of the application.' },
        { name: 'View', description: 'Handles the presentation and user interface.' },
        {
          name: 'Controller',
          description: 'Acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.'
        }
      ],
      username: username
    });
  });

 // Handle the add-comment action here
app.post('/add-comment', (req, res) => {
  const { username, comment } = req.body;

  // Perform any necessary validation or sanitization on the comment data

  // Store the comment in the database
  const newComment = {
    username: req.session.user ? req.session.user.username : username,
    comment: comment,
    timestamp: new Date()
  };

  // Save the comment to the database (specific implementation depends on your database system)
  // Example using MongoDB:
  Comment.create(newComment)
    .then(() => {
      // Comment saved successfully
      res.redirect('/');
    })
    .catch((error) => {
      // Error occurred while saving the comment
      console.error('Failed to save comment:', error);
      res.redirect('/');
    });
});

};
