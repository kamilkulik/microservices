const bodyParser = require('body-parser');
const express = require('express');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {

});

app.post('/posts/:id/comments', (req, res) => {

});

app.listen(4001, () => {
  console.log("Listening on port 4001");
})