import mongoose from 'mongoose';
import { UserRole } from '../utils/constants';
import { IUser } from '../config/interfaces';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
      maxLength: [20, 'Your name is up to 20 chars long.'],
    },
    account: {
      type: String,
      required: [true, 'Please add your account'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
      min: [6, 'Password must be at least 6 chars.'],
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER],
      default: UserRole.STUDENT, // student
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
