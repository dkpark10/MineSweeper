const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(cors({
  origin: [
    'http://localhost:80',
    'http://localhost:3000',
  ],
  credentials: true
}));
app.use(express.json());
app.get('/rank', (req, res) => {
  res.send([
    {
      rank: 1,
      id: 'king',
    },
    {
      rank: 2,
      id: 'queen',
    },
    {
      rank: 3,
      id: 'joker',
    }
  ]);
})

app.post('/', (req, res) => {
  console.log(req.body);
  console.log('... post 이거 대체 왜 또 ...');
  res.send('...');
})

app.listen(port, () => {
  console.log(`server start ${port}`);
})