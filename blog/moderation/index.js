const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.get('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  res.send({});
})

app.listen(4003, () => {
  console.log('Moderation serv listens on 4003');
})