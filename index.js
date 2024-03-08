const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/help', (req, res) => {
  res.status(200).send('Help Page');
})

app.get('/products', (req, res) => {
  res.json({
    'name': 'keyboard',
    'price': 100,
    'category': 'accessories'
  });
})

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
