const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Dota 2 hero voice: DENIED. No token provided.');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};