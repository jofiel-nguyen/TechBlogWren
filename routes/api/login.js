const users = require('../../config/users.json');
const fs = require('fs');
module.exports = function(app) {
  // Login route
  app.get('/login', (req, res) => {
    // Render the login form
    res.render('login');
  });

  // Handle login form submission
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Perform authentication logic here
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      // Authentication success
      req.session.user = { username };
      req.session.loggedIn = true;
      // Redirect to the dashboard or send a success response
      res.redirect('/dashboard');
    } else {
      // Authentication failed
      // Render an error message or redirect back to the login page
      res.send('Invalid username or password');
    }
  });
   // Sign-up route
   app.get('/signup', (req, res) => {
    // Render the sign-up form
    res.render('signup');
  });

  // Handle sign-up form submission
  app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      res.send('Username already exists. Please choose a different username.');
      return;
    }

    // Create a new user object
    const newUser = {
      username,
      password
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array to the users.json file
    fs.writeFile('./config/users.json', JSON.stringify(users), (err) => {
      if (err) {
        res.send('An error occurred while saving the user. Please try again.');
        return;
      }
      res.redirect('/login');
    });
  });
};
