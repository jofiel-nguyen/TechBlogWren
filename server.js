const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
  

// Sample data for blog posts
let blogPosts = [
    {
      id: 1,
      title: 'Understanding MVC (Model-View-Controller)',
      content: 'MVC is a software architectural pattern commonly used in web development. It divides an application into three interconnected components: the Model, the View, and the Controller. The Model represents the data and business logic, the View handles the presentation and user interface, and the Controller acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.',
      dateCreated: '2023-05-20',
      author: 'Lisa Smith'
    },
    {
      id: 2,
      title: 'JavaScript Basics',
      content: 'a high-level, interpreted programming language primarily used for creating interactive and dynamic web content. It was originally developed by Brendan Eich at Netscape Communications in 1995. JavaScript is widely used on the client-side of web development to add interactivity, validate input, manipulate HTML elements, and perform various actions in response to user interactions.',
      dateCreated: '2023-05-19',
      author: 'Jane Smith'
    }
  ];
  
  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage
  });
  
  // Dashboard route
  app.get('/dashboard', (req, res) => {
    // Generate HTML for displaying blog posts
    const blogPostHTML = blogPosts.map(post => `
      <div>
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p>Author: ${post.author}</p>
        <p>Date Created: ${post.dateCreated}</p>
        <button onclick="location.href='/dashboard/edit/${post.id}'">Edit</button>
        <button onclick="deleteBlogPost(${post.id})">Delete</button>
      </div>
      <hr>
    `).join('');
  
    // Render the dashboard with blog post content and form to add a new blog post
    res.send(`
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #184d47; /* Neo green background color */
            color: #e9e9e9; /* Font color opposite to background */
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
          h1 {
            color: #520000; /* Dark brown red font color */
            background-color: aquamarine; /* Aquamarine background color */
           
          }
          .blog-post {
            background-color: aquamarine; /* Aquamarine background color */
            color: #520000; /* Dark brown red font color */
            padding: 10px;
            margin-bottom: 20px;
          }

          h2, p, span {
            margin: 0;
            padding: 0;
          }
          h2 {
            display: inline-block;
          }
          h2, p {
            background-color: aquamarine; /* Aquamarine background color */
            color: #520000; /* Dark brown red font color */
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
            <h1>Dashboard</h1>
            <h2>Tech Blog Posts</h2>
            ${blogPostHTML}
            <form action="/dashboard/new" method="POST">
              <h3>Add a New Blog Post</h3>
              <label for="title">Title:</label>
              <input type="text" id="title" name="title" required>
              <label for="content">Content:</label>
              <textarea id="content" name="content" required></textarea>
              <button type="submit">Create</button>
            </form>
          </div>
          <script>
          // Function to delete a blog post
          function deleteBlogPost(id) {
            fetch('/dashboard/delete/' + id, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              // Handle success or error response
              if (response.ok) {
                // Blog post deleted successfully
                console.log('Blog post deleted successfully');
                // Optionally, you can reload the dashboard to reflect the updated state
                window.location.href = '/dashboard';
              } else {
                // Failed to delete blog post
                console.error('Failed to delete blog post');
              }
            })
            .catch(error => {
              console.error('Error occurred while deleting blog post', error);
            });
          }
        </script>
        </body>
      </html>
    `);
  });
  
  // Route for creating a new blog post
  app.post('/dashboard/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
      id: blogPosts.length + 1,
      title,
      content,
      dateCreated: new Date().toISOString(),
      author: 'Wren' 
    };
    blogPosts.push(newPost);
    res.redirect('/dashboard');
  });
  
  // Route for deleting a blog post
  app.post('/dashboard/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = blogPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      blogPosts.splice(index, 1);
      res.sendStatus(200); // Send a success response
    } else {
      res.sendStatus(404); // Send a not found response
    }
  });
  
  // Route for editing a blog post
  app.get('/dashboard/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    res.sendStatus(200);
    if (post) {
      // Render the form to edit the blog post
      res.send(`
        <html>
          <head>
            <style>
              /* Styles for the form */
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Edit Blog Post</h1>
              <form action="/dashboard/update/${postId}" method="POST">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" value="${post.title}" required>
                <label for="content">Content:</label>
                <textarea id="content" name="content" required>${post.content}</textarea>
                <button type="submit">Update</button>
              </form>
            </div>
          </body>
        </html>
      `);
    } else {
      res.redirect('/dashboard');
    }
  });
  
  // Route for updating a blog post
  app.post('/dashboard/update/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      blogPosts[postIndex].title = title;
      blogPosts[postIndex].content = content;
    }
    res.redirect('/dashboard');
  });
  
// Helper function to delete a blog post
function deleteBlogPost(id) {
    fetch(`/dashboard/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Handle success or error response
      if (response.ok) {
        // Delete successful, update the UI or perform any other necessary actions
        console.log('Blog post deleted successfully');
        // Optionally, you can reload the dashboard to reflect the updated state
        window.location.href = '/dashboard';
      } else {
        // Delete failed, handle the error
        console.error('Failed to delete blog post');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error occurred while deleting blog post', error);
    });
  }
  

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
