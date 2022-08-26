const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hi there');
})

app.listen(8080, () => {
  console.log('Listening on 8080');
})