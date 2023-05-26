const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const Comment = require('../../models/comment');

module.exports = function (app) {
  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  });

  // Set up session middleware
  app.use(
    session({
      secret: 'super secret secret',
      resave: false,
      saveUninitialized: false,
    })
  );

  // Set the view engine to use Handlebars
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '..', '..', 'views'));

  // Connect to the database
  mongoose
    .connect('mongodb://localhost:27017/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });

  // Homepage route
  app.get('/', (req, res) => {
    const username = req.session.user ? req.session.user.username : null;

    res.render('homepage', {
      title: 'The Tech Blog',
      components: [
        { name: 'Model', description: 'Represents the data and business logic of the application.' },
        { name: 'View', description: 'Handles the presentation and user interface.' },
        {
          name: 'Controller',
          description: 'Acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.',
        },
      ],
      loggedIn: req.session.user ? true : false,
      username: username,
    });
  });

  // Handle the add-comment action
  app.post('/add-comment', (req, res) => {
    if (!req.session.user) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    const { comment } = req.body;
    const username = req.session.user.username;

    // Store the comment in the database
    const newComment = {
      username: username,
      content: comment,
      createdAt: new Date(),
    };

    // Save the comment to the database
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

  // Render the login page
  app.get('/login', (req, res) => {
    res.render('login', {
      title: 'Login',
    });
  });
};
