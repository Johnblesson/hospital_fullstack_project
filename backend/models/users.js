import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    validate: {
      validator: (value) => value.length >= 2 && value.length <= 255,
      message: 'First name must be between 2 and 255 characters.',
    },
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
  },
  role: String,
  email: {
    type: String,
    required: [true, 'email is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
}, 
},{
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;
