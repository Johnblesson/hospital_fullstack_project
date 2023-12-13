import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { canAccessData } from '../privilege/accessRights.js';
import checkValidation from '../middleware/validation.js';
import dotenv from 'dotenv';
dotenv.config();

// Define add Function
const add = async (req, res) => {
// Use the checkValidation middleware
checkValidation(req, res);

const { firstName, lastName, role, username, email, password } = req.body;

const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);

const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ error: 'Email exists' });
  }

  try {
    const resp = await User.create({
      firstName,
      lastName,
      email,
      role,
      username,
      password: hashPassword,
    });

    const payload = {
      user: {
        firstName,
        role,
        email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({ success: 'User Added Successfully', accessToken: token });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to create user',
    });
  }
};

// Define getAll Function
const getAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Define getById Function
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findOne({ _id: id }, { password: 0 });
    if (singleUser) {
      res.json({
        confirm: 'Success',
        data: singleUser,
      });
      return;
    }
    res.json({
      confirm: 'Not Exist',
      data: [],
    });
  } catch (err) {
    res.json({
      confirm: 'Fail',
      data: 'Invalid input',
    });
  }
};

// Define deleteOne Function
const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json({
      confirm: 'Success',
      data: user,
    });
  } catch (err) {
    res.json({
      confirm: 'Fail',
      data: err.message,
    });
  }
};

// Define update Function
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      confirm: 'Success',
      data: user,
    });
  } catch (err) {
    res.json({
      confirm: 'Fail to update user',
      data: err.message,
    });
  }
};

// export all functions
export default { add, getAll, getById, deleteOne, update };
