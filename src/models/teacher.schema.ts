import mongoose from 'mongoose';
import { validateEmail } from '../utils/validation';



const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name Teacher'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please Add Name Teacher'],
    lowercase: true,
    unique: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  gender: {
    type: String,
    required: [true, 'Please Add Gender'],
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: [true, 'Please Add Role'],
    trim: true,
    unique: true,
  },
  class_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

export default mongoose.model('Teacher', teacherSchema);