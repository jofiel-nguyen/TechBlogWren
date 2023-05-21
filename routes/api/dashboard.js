module.exports = function(app) {
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
  const currentDate = new Date().toISOString().split('T')[0];  
  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage
  });
 
 // Dashboard route
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username;
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
            <h1>Welcome, ${username}!</h1>
            <div class="container">
          <div class="top-bar">
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/login">Log in</a>
          </div>
          <div class="container">
            <div class="blog-posts">
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
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
});

// Route for creating a new blog post
app.post('/dashboard/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    dateCreated: currentDate,
    author:req.session.user.username,
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

  if (post) {
    const username = req.session.user.username;
    // Render the form to edit the blog post
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
            background-color: #520000; 
          }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Edit Blog Post</h1>
            <h2>Author: ${username}</h2> 
            <form action="/dashboard/update/${postId}" method="POST">
              <label for="title">Title:</label>
              <input type="text" id="title" name="title" value="${post.title}" required>
              <label for="content">Content:</label>
              <textarea id="content" name="content" required>${post.content}</textarea>
              <input type="hidden" name="author" value="${username}">
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
  const { title, content, author } = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    blogPosts[postIndex].title = title;
    blogPosts[postIndex].content = content;
    blogPosts[postIndex].author = author;
  }
  res.redirect('/dashboard');
});
};