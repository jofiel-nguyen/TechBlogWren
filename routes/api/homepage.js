module.exports = function(app) {
// Homepage route
app.get('/', (req, res) => {
    // Render the homepage with specified styles
    res.send(`

      <html>
        <head>
          <title>The Tech Blog</title>
          <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: auto;
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
            <h1>The Tech Blog</h1>
            <h2>About MVC (Model-View-Controller)</h2>
            <p>
              MVC is a software architectural pattern commonly used in web development. It divides an application into three interconnected components:
            </p>
            <table>
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
        </body>
      </html>
    `);
  });
};