require('dotenv').config();
const express = require('express');
const { errorHandler, errorLogs } = require('./middleware/error.handler');
const apiRouter = require('./server/index');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');
const usageMonitor = require('./middleware/usage-monitor');

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
        url: process.env.NODE_ENV === 'production' 
          ? 'https://node-api-6egn.onrender.com' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server'
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
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10, 
  message: 'Creation limit exceeded, please try again later'
});

app.use('/api/v1/products', (req, res, next) => {
  if (req.method === 'POST') {
    return createLimiter(req, res, next);
  }
  next();
});

const timeout = (req, res, next) => {
  res.setTimeout(5000, () => {
    res.status(408).json({ error: 'Application timeout' });
  });
  next();
};

app.use(timeout);

const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(usageMonitor);

