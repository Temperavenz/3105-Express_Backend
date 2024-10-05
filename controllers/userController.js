const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Validation schemas
const registrationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const secretKey = 'your-secret-key'; // Use environment variables for production

// Registration handler
exports.register = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password, email } = req.body;
  const existingUser = userModel.findUserByUsername(username);
  if (existingUser) return res.status(400).send('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
    email
  };

  userModel.addUser(newUser);
  res.status(201).send('User registered successfully');
};

// Login handler
exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  const user = userModel.findUserByUsername(username);
  if (!user) return res.status(400).send('Invalid credentials');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  res.send({ token });
};

// Profile handler (requires authentication)
exports.getProfile = (req, res) => {
  const user = userModel.findUserById(req.user.id);
  if (!user) return res.status(404).send('User not found');

  res.send({
    username: user.username,
    email: user.email
  });
};