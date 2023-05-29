const fs = require('fs');
const path = require('path');

const commentsFile = path.join(__dirname,'../../data/comments.json');

// Save comment to the file
const saveComment = (comment) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let comments = [];

    if (data) {
      comments = JSON.parse(data);
    }

    comments.push(comment);

    fs.writeFile(commentsFile, JSON.stringify(comments), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Comment saved successfully!');
    });
  });
};

// Delete comment from the file
const deleteComment = (commentId) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let comments = [];

    if (data) {
      comments = JSON.parse(data);
      console.log(comments);
    }

    // Find the comment index by ID
    const newComment = comments.filter((comment) => comment.id === commentId);

    
      // Save the updated comments to the file
      fs.writeFile(commentsFile, JSON.stringify(newComment), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Comment deleted successfully!');
      });
  });
};

// Export the functions for saving and deleting comments
module.exports = {
  saveComment,
  deleteComment
};
