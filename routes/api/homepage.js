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
              margin: 0;
              padding: 0;
              background-color: #184d47; /* Neo green background color */
              color: #e9e9e9; /* Font color opposite to background */
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
              color: #520000; /* Dark brown red font color */
              background-color: aquamarine; /* Aquamarine background color */
              padding: 10px;
              margin-bottom: 20px;
              display: inline-block;
            }
            
            h2, p {
              background-color: aquamarine; /* Aquamarine background color */
              color: #520000; /* Dark brown red font color */
              padding: 10px;
              margin-bottom: 20px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Shadow applied to table */
            }
            
            th, td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #e9e9e9;
            }
            
            th {
              background-color: #520000;
              color: #fff;
            }
            tbody{
                color: black;
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