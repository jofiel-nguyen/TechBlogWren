const express = require('express');
const path = require('path');

module.exports = function(app) {
  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  });
  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage with specified styles
    res.send(`
      <html>
        <head>
          <title>The Tech Blog</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div class="container">
            <div class="top-bar">
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/login">Log in</a>
            </div>
            <div class="container">
              <h1>The Tech Blog</h1>
              <h2>About MVC (Model-View-Controller)</h2>
              <p>
                MVC is a software architectural pattern commonly used in web development. It divides an application into three interconnected components:
              </p>
              <table class="table-style">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Model</td>
                    <td>Represents the data and business logic of the application.</td>
                  </tr>
                  <tr>
                    <td>View</td>
                    <td>Handles the presentation and user interface.</td>
                  </tr>
                  <tr>
                    <td>Controller</td>
                    <td>Acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.</td>
                  </tr>
                </tbody>
              </table>
              <p>
                By using the MVC pattern, developers can achieve separation of concerns, allowing for easier maintenance, code reusability, and scalability of the application.
              </p>
            </div>
          </div>
        </body>
      </html>
    `);
  });
};
