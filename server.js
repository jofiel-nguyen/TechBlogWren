const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure session middleware
app.use(session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: true
}));

// Configure the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), { 
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
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
