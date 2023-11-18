require('dotenv').config();
require('colors');

const express = require('express');
const app = express();

// Configuration
require('dotenv').config({ path: './config/.env' });
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';
// asyncErrors to errorHandler
require('express-async-errors');
// Connect to DB
require('./config/db')();

// Middlewares
// Accept/parse JSON requests
app.use(express.json());

// CORS Middleware:

app.use(require('cors')());

// Logger middleware
app.use(require('./middlewares/logger'));

// Authorization
app.use(require('./middlewares/authentication'));

// res.getModelList():
app.use(require('./middlewares/query'));

// Home Path
// app.all('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Welcome to ToDo API',
//     documents: '/api/documents',
//     user: req.user,
//   });
// });

// Routes
app.use('/api', require('./routes'));
//

app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Not Found',
  });
});

// Express Error Handler
app.use(require('./middlewares/errorHandler'));

// Run the server
app.listen(PORT, console.log(`Server running on http://${HOST}:${PORT}`.green));
