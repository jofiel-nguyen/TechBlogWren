const users = require('../../config/users.json');

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

      // Redirect to the dashboard or send a success response
      res.redirect('/dashboard');
    } else {
      // Authentication failed
      // Render an error message or redirect back to the login page
      res.send('Invalid username or password');
    }
  });
};
