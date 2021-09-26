import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your course name'],
      trim: true,
      min: [5, 'Course name must be at least 5 chars long.'],
    },
    course_id: {
      type: String,
      required: [true, 'Please add course id.'],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', courseSchema);
