import { Request, Response } from 'express';
import Course from '../models/course.schema';

const courseController = {
  createCourse: async (req: Request, res: Response) => {
    try {
      const { courseName, courseId } = req.body;

      const course = await Course.findOne({ course_id: courseId });

      // Check course exist
      if (course) return res.status(400).json({ msg: 'Course already exist.' });

      // Create new course
      const newCourse = await Course.create({
        name: courseName,
        course_id: courseId,
      });

      return res.json({
        msg: 'Create success!',
        student: newCourse,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCourseById: async (req: Request, res: Response) => {
    try {
      const course = await Course.findOne({
        course_id: req.params.courseId,
      });

      // Check course exists
      if (!course)
        return res.status(400).json({ msg: 'Course does not exist.' });

      return res.json(course);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllCourse: async (req: Request, res: Response) => {
    try {
      const countCourse = await Course.countDocuments();
      const courses = await Course.find();

      res.status(201).json({
        status: 'success',
        data: {
          courses,
          total: countCourse,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCourse: async (req: Request, res: Response) => {
    try {
      const { courseName } = req.body;

      const course = await Course.findOneAndUpdate(
        { course_id: req.params.courseId },
        { name: courseName }
      );

      // Check course exist
      if (!course)
        return res.status(400).json({ msg: 'Course can not update.' });

      return res.json({ msg: 'Update success!', course });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCourse: async (req: Request, res: Response) => {
    try {
      const course = await Course.findOneAndDelete({
        course_id: req.params.courseId,
      });

      // Check course exist
      if (!course)
        return res.status(400).json({ msg: 'Course can not delete.' });

      return res.json({
        msg: 'Delete success!',
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default courseController;
