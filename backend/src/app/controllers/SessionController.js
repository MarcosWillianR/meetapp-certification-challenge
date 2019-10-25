import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import AuthConfig from '../../configs/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Verify data entry first
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * If data entry is ok, continue to next steps of verification
     */

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
