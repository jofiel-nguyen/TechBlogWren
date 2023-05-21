const express = require('express');
const app = express();
const session = require('express-session');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
// Import and configure the home module
const homeModule = require('./routes/api/homepage');
homeModule(app);
// Import and configure the login module
const loginModule = require('./routes/api/login');
loginModule(app);

// Import and configure the dashboard module
const dashboardModule = require('./routes/api/dashboard');
dashboardModule(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
