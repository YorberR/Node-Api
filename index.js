require('dotenv').config();
const express = require('express');
const { errorHandler, errorLogs } = require('./middleware/error.handler');
const apiRouter = require('./server/index');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node API',
      version: '1.0.0',
      description: 'API Documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const compression = require('compression');
const helmet = require('helmet');

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(helmet());
app.use(compression());
apiRouter(app);
app.use(errorHandler);
app.use(errorLogs);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

