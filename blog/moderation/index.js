const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.get('/events', (req, res) => {
  const { type, data } = req.body;
})

app.listen(4003, () => {
  console.log('Moderation serv listens on 4003');
})