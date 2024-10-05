const rateLimit = require('express-rate-limit');

// Define rate limit: max 5 requests per 30 seconds
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 5,              // Limit each IP to 5 requests per windowMs
  message: 'I am ISMIS, cannot handle too many requests. Try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;