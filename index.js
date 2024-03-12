const express = require('express');
const apiRouter = require('./server/index');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

apiRouter(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

