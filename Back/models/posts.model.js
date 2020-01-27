const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'posts.data.json'
);

const getPostsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({});
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Post {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  save() {
    getPostsFromFile(posts => {
      posts.push(this);
      fs.writeFile(p, JSON.stringify(posts), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getPostsFromFile(cb);
  }
};
