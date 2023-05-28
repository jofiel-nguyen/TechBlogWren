const fs = require('fs');

let blogPosts = [];

// Function to save blogPosts array to posts.json
function savePostsToJSON(posts) {
  const jsonContent = JSON.stringify(posts, null, 2);
  fs.writeFile('./data/posts.json', jsonContent, 'utf8', err => {
    if (err) {
      console.error('Error writing to posts.json:', err);
    } else {
      console.log('Posts saved to posts.json');
    }
  });
}

// Load blog posts from posts.json
fs.readFile('./data/posts.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading posts.json:', err);
  } else {
    try {
      blogPosts = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing posts.json:', error);
    }
  }
});

module.exports = function (app) {
  const currentDate = new Date().toISOString().split('T')[0];

  // Function to save comments array to comments.json
  function saveCommentsToJSON(comments) {
    const jsonContent = JSON.stringify(comments, null, 2);
    fs.writeFile('./data/comments.json', jsonContent, 'utf8', err => {
      if (err) {
        console.error('Error writing to comments.json:', err);
      } else {
        console.log('Comments saved to comments.json');
      }
    });
  }

  // Load comments from comments.json
  function loadCommentsFromJSON(callback) {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading comments.json:', err);
        callback([]);
      } else {
        try {
          const comments = JSON.parse(data);
          callback(comments);
        } catch (error) {
          console.error('Error parsing comments.json:', error);
          callback([]);
        }
      }
    });
  }

  // Homepage route
  app.get('/', (req, res) => {
    const loggedIn = req.session.user ? true : false;
    const username = loggedIn ? req.session.user.username : null;

    // Load comments from JSON file
    loadCommentsFromJSON(comments => {
      res.render('homepage', {
        title: 'The Tech Blog',
        components: [
          { name: 'Model', description: 'Represents the data and business logic of the application.' },
          { name: 'View', description: 'Handles the presentation and user interface.' },
          { name: 'Controller', description: 'Acts as an intermediary between the Model and View, handling user input and updating the Model or View as necessary.' },
        ],
        loggedIn: loggedIn,
        username: username,
        comments: comments,
      });
    });
  });
// Dashboard route
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username;
    const loggedIn = true;
    // Render the dashboard template with blogPosts data
    res.render('dashboard', { blogPosts, username, loggedIn });
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
});

// Route for creating a new blog post
app.get('/dashboard/new', (req, res) => {
  // Render the page for creating a new blog post
  res.render('new');
});

// Route for submitting a new blog post
app.post('/dashboard/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    dateCreated: currentDate,
    author: req.session.user.username,
  };
  blogPosts.push(newPost);

  // Save the updated blogPosts array to posts.json
  savePostsToJSON(blogPosts);

  res.redirect('/dashboard');
});
// Dashboard route
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.session.user.username) {
    const username = req.session.user.username;
    const loggedIn = true;
    // Render the dashboard template with blogPosts data
    res.render('dashboard', { blogPosts, username, loggedIn });
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
});

// Route for editing a blog post
app.get('/dashboard/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === postId);

  if (post && req.session.user && req.session.user.username) {
    const username = req.session.user.username;
    // Replace the author name with the username
    post.author = username;
    // Render the edit handlebars template with the updated post data
    res.render('edit', { post, username, loggedIn: true });
  } else {
    res.sendStatus(404); // Send a not found response
  }
});


// Route for deleting a blog post
app.post('/dashboard/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = blogPosts.findIndex(post => post.id === postId);
  if (index !== -1) {
    blogPosts.splice(index, 1);

    // Save the updated blogPosts array to posts.json
    savePostsToJSON(blogPosts);

    res.sendStatus(200); // Send a success response
  } else {
    res.sendStatus(404); // Send a not found response
  }
});

// Route for updating a blog post
app.post('/dashboard/update/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  // Retrieve the updated title, content, and author from the request body
  const { title, content, author } = req.body;

  // Find the blog post by ID and update its title, content, and author
  const post = blogPosts.find(post => post.id === postId);
  if (post) {
    post.title = title;
    post.content = content;
    // Update the author only if it has changed in the form
    if (author !== post.author) {
      post.author = author;
    }

    // Save the updated blogPosts array to posts.json
    savePostsToJSON(blogPosts);

    res.redirect('/dashboard');
  } else {
    res.sendStatus(404);
  }
});

// Route for logging out
app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy();

  // Redirect to the login page
  res.redirect('/login');
});
}