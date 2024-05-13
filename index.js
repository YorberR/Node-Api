const express = require('express');
const { errorHandler, errorLogs } = require('./middleware/error.handler');
const apiRouter = require('./server/index');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

apiRouter(app);
app.use(errorHandler);
app.use(errorLogs);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

