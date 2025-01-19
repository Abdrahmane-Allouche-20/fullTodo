const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  // Check for JWT_SECRET
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET is not defined' });
  }

  // Check for authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid authorization' });
  }

  // Extract token
  const token = authHeader.split(' ')[1].trim();

  try {
    // Verify token
    const payload = jwt.verify(token,"3a1f4b8e2c7d9e6f5a0b9c8d7e6f5a0b9c8d7e6f5a0b9c8d7e6f5a0b9c8d7e6f5a0b9c8d7e6f5a0b9c8d7e6f5a0b");

    // Attach user to the request object
    req.user = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };

    // Log payload in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Decoded payload:', payload);
    }

    next();
  } catch (error) {
    return res.status(401).json({ error:error });
  }
};

module.exports = auth;