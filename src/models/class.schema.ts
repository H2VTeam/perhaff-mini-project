import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add class name'],
      trim: true,
      min: [5, 'Class name must be at least 5 chars long.'],
    },
    class_id: {
      type: String,
      required: [true, 'Please add class id'],
      trim: true,
      unique: true,
    },
    course_id: {
      required: [true, 'Please add course id'],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default: '',
    },
    student_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Class', classSchema);
