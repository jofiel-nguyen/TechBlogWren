const fs = require('fs');
const path = require('path');

const commentsFile = path.join(__dirname, '..', 'data', 'comments.json');

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
    }

    // Find the comment index by ID
    const commentIndex = comments.findIndex((comment) => comment._id === commentId);

    if (commentIndex !== -1) {
      // Delete the comment
      comments.splice(commentIndex, 1);

      // Save the updated comments to the file
      fs.writeFile(commentsFile, JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Comment deleted successfully!');
      });
    } else {
      console.log('Comment not found!');
    }
  });
};

// Export the functions for saving and deleting comments
module.exports = {
  saveComment,
  deleteComment
};
