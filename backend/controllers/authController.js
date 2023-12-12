import User from '../models/users.js';
import bcrypt from 'bcryptjs';
// import gravatar from 'gravatar';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login BACKEND', email, password);

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    console.log('data:', user);

    const userPass = user.dataValues.password;
    const isMatch = await bcrypt.compare(password, userPass);

    if (!isMatch) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const payload = {
      user: {
        id: user.dataValues.user_id,
        email,
        role: user.dataValues.role,
        name: user.dataValues.firstName,
      },
    };

    const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
    return res.json({ token, user }); //accessToken:
  } catch (error) {
    res.json({ message: 'Server Error', error });
    return;
  }
};

export default login;