import User from '../models/User';

class UserController {
  async store(req, res) {
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
