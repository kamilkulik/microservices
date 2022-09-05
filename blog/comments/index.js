const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    }
  }).catch((err) => {
    console.error(err.message);
  })

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received event: ', req.body.type)

  const { type, data } = req.body;
  const { content, id, postId, status } = data;

  if (type === 'CommentModerated') {
    const comments = commentsByPostId[postId];
    comments.map((comment) => {
      if (comment.id === id) {
        comment.status = status;
      }
    });

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  res.send({});
})

app.listen(4001, () => {
  console.log("Comments serv listening on 4001");
})