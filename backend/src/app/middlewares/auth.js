import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../configs/auth';

export default async (req, res, next) => {
  const authToken = req.headers.authentication;

  // Verifiy if authToken is not undefined
  if (!authToken) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  // Split token and pickup only token in array
  const [, token] = authToken.split(' ');

  // try: decode token and set userId to pickup in UserController
  // catch: returns an error and won't let you access the page
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

// Promisify: transform function callback in async function
