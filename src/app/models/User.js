import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        is_admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
