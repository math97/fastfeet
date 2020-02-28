import jwt from 'jsonwebtoken';
import authConfig from '../../config/AuthConfig';

import User from '../models/User';

const yup = require('yup');

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validator error' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ erro: 'User not found' });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'password not match' });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
