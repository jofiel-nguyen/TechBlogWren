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
    content: 'JaveScript is a high-level, interpreted programming language primarily used for creating interactive and dynamic web content. It was originally developed by Brendan Eich at Netscape Communications in 1995. JavaScript is widely used on the client-side of web development to add interactivity, validate input, manipulate HTML elements, and perform various actions in response to user interactions.',
    dateCreated: '2023-05-19',
    author: 'Jane Smith'
  }
];
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

      // Render the dashboard template with blogPosts data
      res.render('dashboard', { blogPosts, username });
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
/// Route for editing a blog post
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
    res.redirect('/dashboard');
  } else {
    res.sendStatus(404);
  }
});

};
