import jwt from 'jsonwebtoken';
import User from '../models/User';
import AuthConfig from '../../configs/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verify if user does not exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    // Verify if password does not match
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    // return json with user data and token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
