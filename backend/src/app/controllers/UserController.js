import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    // Verify data entry first
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * If data entry is ok, continue to next steps of verification
     */

    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    // Verify if user exists
    if (userExists) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const { id, name } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Verify data entry first
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * If data entry is ok, continue to next steps of verification
     */

    const { old_password, email, password } = req.body;

    const user = await User.findByPk(req.userId);

    // Verify if old password is informed
    if (!old_password && password) {
      return res
        .status(400)
        .json({ error: 'Please, inform your old password' });
    }

    // Verify oldPassword
    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(400).json({ error: 'Password invalid' });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already registered' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
