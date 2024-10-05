const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(loggerMiddleware);  // Use the logger middleware here

// Routes
app.use('/user', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});