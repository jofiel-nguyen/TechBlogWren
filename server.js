const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./routes/api/homepage')(app);
require('./routes/api/blogpost')(app);
require('./routes/api/login')(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
