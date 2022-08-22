const axios = require('axios');
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bodyParser.json())
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  const { id, content, postId, status, title } = data;
  if (type === 'PostCreated') {

    posts[id] = { id, title, comments: []};
  }

  if (type === 'CommentCreated') {
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const post = posts[postId];
    post.comments.map((comment) => {
      if (comment.id === id) {
        comment.status = status;
        comment.content = content;
      }
    })
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
})

app.post('/events', (req, res) => {
  const { type, data } = req.body;


  handleEvent(type, data);
  res.send({});
})

app.listen(4002, async () => {
  console.log('Query serv listening on 4002');

  try {
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
      console.log('Processing event: ', event.type);

      handleEvent(event.type, event.data);
    }
  } catch(err) {
    console.error(err.message);
  }
})