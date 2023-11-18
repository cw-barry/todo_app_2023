const User = require('../models/User');
const Token = require('../models/Token');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username and email are provided
  if (!username || !email || !password) {
    res.errorStatusCode = 400;
    throw new Error('Please provide username, email, and password');
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.errorStatusCode = 400;
      throw new Error('Username or email already in use');
    }

    // Create the new user
    const newUser = await User.create({ username, email, password });

    // Create a token for the new user
    const tokenKey = generateToken(newUser._id + Date.now());
    const tokenData = await Token.create({
      userId: newUser._id,
      token: tokenKey,
    });

    res.status(201).json({
      error: false,
      token: tokenData.token,
      user: newUser,
    });
  } catch (error) {
    res.errorStatusCode = 500;
    throw new Error(error.message);
  }
};

exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email) && password) {
    res.errorStatusCode = 401;
    throw new Error('Please enter username/email and password');
  }
  // Find the user
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    res.errorStatusCode = 400;
    throw new Error('Username or email does not exist');
  }

  // Check password
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    res.errorStatusCode = 401;
    throw new Error('Wrong password or username/email');
  }

  // Check the Token
  let tokenData = await Token.findOne({ userId: user._id });
  if (!tokenData) {
    // Create Token
    const tokenKey = generateToken(user._id + Date.now());
    tokenData = await Token.create({ userId: user._id, token: tokenKey });
  }
  res.status(200).json({
    error: false,
    token: tokenData.token,
    user,
  });
};

exports.logout = async (req, res) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(' ')[1] : null;

  // Delete the token from database
  const tokenData = await Token.deleteOne({ token: tokenKey });
  console.log('test');
  res.status(204).send();
};
