const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
  username: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model using the comment schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;
