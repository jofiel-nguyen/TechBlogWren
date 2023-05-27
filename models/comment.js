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

// Export the function for saving comments
module.exports = {
  saveComment
};
