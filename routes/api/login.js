module.exports = function(app) {
// Login route
app.get('/login', (req, res) => {
    // Handle login logic here
    res.send(`
      <html>
        <head>
          <style>
          body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f2f2f2;
            }
            h1 {
              text-align: center;
            }
            label {
              display: block;
              margin-bottom: 10px;
            }
            input[type="text"],
            input[type="password"] {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
            }
            button {
              width: 100%;
              padding: 10px;
              background-color: #4CAF50;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background-color: #45a049;
            }
            .top-bar {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-bottom: 20px;
            }
    
            .top-bar a {
              color: #e9e9e9;
              text-decoration: none;
              padding: 10px;
              margin-right: 10px;
              background-color: #520000; /* Dark brown red background color */
            }
          </style>
        </head>
        <body>
        <div class="container">
          <div class="top-bar">
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/login">Log in</a>
          </div>
          <div class="container">
            <h1>Login</h1>
            <form action="/login" method="POST">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" required>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
              <button type="submit">Login</button>
              </form>
          </div>
        </body>
      </html>
    `);
  });
};