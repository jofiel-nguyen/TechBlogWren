const fs = require('fs');

let blogPosts = [];

// Function to save blogPosts array to posts.json
function savePostsToJSON(posts) {
  const jsonContent = JSON.stringify(posts, null, 2);
  fs.writeFile('posts.json', jsonContent, 'utf8', err => {
    if (err) {
      console.error('Error writing to posts.json:', err);
    } else {
      console.log('Posts saved to posts.json');
    }
  });
}

// Load blog posts from posts.json
fs.readFile('posts.json', 'utf8', (err, data) => {
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

module.exports = function(app) {
  const currentDate = new Date().toISOString().split('T')[0];

  // Homepage route
  app.get('/', (req, res) => {
    // Render the homepage
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
  app.get('/dashboard/new', (req, res) => {
    // Render the page for creating a new blog post
    res.render('new');
  });
  
 // Route for creating a new blog post
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
// Route for editing a blog post
app.get('/dashboard/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === postId);

  if (post) {
    const username = req.session.user.username;
    // Replace the author name with the username
    post.author = username;
    // Render the edit handlebars template with the updated post data
    res.render('edit', { post });
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
app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy();

  // Redirect to the login page
  res.redirect('/login');
});

};
