import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Please add your full name'],
      trim: true,
      min: [20, 'Your full name must be at least 20 chars long.'],
    },
    student_id: {
      type: String,
      required: [true, 'Please add your email or phone'],
      trim: true,
      unique: true,
    },
    class_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Student', studentSchema);
