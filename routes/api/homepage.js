const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fs = require('fs');
const commentsFile = path.join(__dirname, '..', '..', 'data', 'comments.json');

// Import the deleteComment function from comment.js
const { deleteComment } = require('../api/comment');

module.exports = function (app) {
  // Create an instance of exphbs
  const handlebars = exphbs.create();

  // Register the formatDate helper
  handlebars.handlebars.registerHelper('formatDate', (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  });

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
  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '..', '..', 'views'));

  // Homepage route
  app.get('/', (req, res) => {
    const username = req.session.user ? req.session.user.username : null;

    // Read the comments from the file
    fs.readFile(commentsFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const comments = data ? JSON.parse(data) : [];

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
        comments: comments,
      });
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

    // Store the comment
    const newComment = {
      username: username,
      content: comment,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Save the comment to the file
    saveComment(newComment);

    // Redirect back to the homepage
    res.redirect('/');
  });

  // Render the login page
  app.get('/login', (req, res) => {
    if (req.session.user) {
      // User is already logged in, redirect to the homepage
      return res.redirect('/');
    }

    res.render('login');
  });

  // Handle the logout action
  app.get('/logout', (req, res) => {
    // Clear the user session
    req.session.destroy();

    // Redirect to the login page
    res.redirect('/login');
  });

  // Delete comment route
  app.delete('/delete-comment/:id', (req, res) => {
    if (!req.session.user) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    const commentId = req.params.id;

    // Call the deleteComment function passing the comment ID
    deleteComment(commentId);

    // Read the comments from the file
    fs.readFile(commentsFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let comments = [];

      if (data) {
        comments = JSON.parse(data);
      }

      // Find the comment index by ID
      const commentIndex = comments.findIndex((comment) => comment._id === commentId);

      if (commentIndex !== -1) {
        // Delete the comment
        comments.splice(commentIndex, 1);

        // Save the updated comments to the file
        fs.writeFile(commentsFile, JSON.stringify(comments), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log('Comment deleted successfully!');
          res.sendStatus(200);
        });
      } else {
        console.log('Comment not found!');
        res.sendStatus(404);
      }
    });
  });

  // Save comment to the file
  const saveComment = (comment) => {
    fs.readFile(commentsFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let comments = [];

      if (data) {
        comments = JSON.parse(data);
      }

      comments.push(comment);

      fs.writeFile(commentsFile, JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Comment saved successfully!');
      });
    });
  };
};
