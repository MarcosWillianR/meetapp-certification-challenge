import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    // set password_hash with bcrypt and password beforeSafe in database
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // User is referenced in many models
  static associate(models) {
    this.hasMany(models.Meetup);
    this.hasMany(models.Subscription);
  }

  // function to check if password does match (for route with require sessions)
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
