const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  console.log('... 이거 대체 왜 또 ...');
  res.send({ number: 23 });
})

app.post('/', (req, res) => {
  console.log(req.body);
  console.log('... post 이거 대체 왜 또 ...');
  res.send('...');
})

app.listen(port, () => {
  console.log('server start 8080');
})