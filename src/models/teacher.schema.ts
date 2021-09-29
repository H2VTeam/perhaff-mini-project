import mongoose from 'mongoose';
import { validateEmail } from '../utils/validation';

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    required: [true, 'Please add your email or phone'],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please Add Name Teacher'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please Add Name Teacher'],
    lowercase: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  gender: {
    type: String,
    required: [true, 'Please Add Gender'],
    trim: true,
  },
  class_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

export default mongoose.model('Teacher', teacherSchema);
