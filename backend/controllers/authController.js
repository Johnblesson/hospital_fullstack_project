import User from '../models/users.js';
import bcrypt from 'bcryptjs';
// import gravatar from 'gravatar';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Define login Function
const login = async (req, res) => {
  const { email, password } = req.body;

// Console Log for Debugging:
  console.log('Login BACKEND', email, password);

// Check if user exists in database
  try {
    const user = await User.findOne({ email: email });

// Handle User Not Found
  if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    console.log('data:', user);

// Handle Invalid User Data
  const userPass = user?.password;
    if (!userPass) {
      return res.status(500).json({ error: 'Invalid user data in the database' });
    }

// // Compare Passwords using bcrypt
//     // const userPass = user.password;
//     const isMatch = await bcrypt.compare(password, user.password );

// // Handle Passwords Not Matching
//   if (!isMatch) {
//     return res.status(400).json({ error: 'Password does not match' });
//     }

// Create JWT Payload:
    const payload = {
      user: {
        id: user.user_id,
        email,
        role: user.role,
        name: user.firstName,
      },
    };

// Sign JWT Token
    const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
// Send JWT Token and User Data in Response
    console.log('Payload:', payload);
    console.log('Token:', token);
    return res.json({ accessToken: token, user });   
}

  // Handle Errors      
  catch (error) {
  console.error('Error during login:', error);
  res.status(500).json({ message: 'Server Error' });
  return;
  }
};

// Export the login Function
export default login;
