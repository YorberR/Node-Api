require('dotenv').config();
const express = require('express');
const { errorHandler, errorLogs, boomErrorHandler } = require('./middleware/error.handler');
const apiRouter = require('./server/index');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');
const usageMonitor = require('./middleware/usage-monitor');
const sequelize = require('./libs/sequelize');
const seedDatabase = require('./db/seeds/seedDatabase');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node API',
      version: '1.0.0',
      description: 'API Documentation for Node-API project'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://node-api-6egn.onrender.com' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server'
      }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              description: 'HTTP status code'
            },
            error: {
              type: 'string',
              description: 'Error type'
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            details: {
              type: 'array',
              description: 'Error details for validation errors',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    description: 'Field with error'
                  },
                  message: {
                    type: 'string',
                    description: 'Error message for this field'
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const compression = require('compression');
const helmet = require('helmet');

// Apply rate limiting before routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Security and optimization
app.use(helmet());
app.use(compression());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Node-API! Check out /api-docs for documentation.');
});

// API routes
apiRouter(app);

// Creation rate limiter for specific endpoints
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

// Timeout middleware
const timeout = (req, res, next) => {
  res.setTimeout(5000, () => {
    res.status(408).json({ 
      statusCode: 408,
      error: 'Request Timeout',
      message: 'Application timeout'
    });
  });
  next();
};

app.use(timeout);

// Usage monitoring
app.use(usageMonitor);

// Error handling middleware (must be after routes)
app.use(errorLogs);
app.use(boomErrorHandler);
app.use(errorHandler);

// Create logs directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Database initialization
const initDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database initialized successfully');
    await seedDatabase();
    console.log('Test data created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Start server
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
  await initDatabase();
});

