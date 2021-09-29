import { Request, Response } from 'express';
import Teacher from '../models/teacher.schema';

const teacherController = {
  createTeacher: async (req: Request, res: Response) => {  // create res object properties === object schema properties
    try {
      const data = req.body;
      const teacher = await Teacher.findOne({ teacher_id: data.teacher_id });
      if (teacher)
        return res.status(400).json({ msg: 'Teacher already exist.' });
      return res.json({
        msg: 'Create success!',
        teacher: await Teacher.create(data),
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllTeachers: async (req: Request, res: Response) => {
    try {
      const { limit, offset } = req.query; // pagination
      if (limit && offset) {
        let teachers = [];
        let total: number = 0;
        total = await Teacher.countDocuments();
        teachers = await Teacher.find()
          .limit(parseInt(limit as string, 10))
          .skip(parseInt(offset as string, 10));

        res.status(201).json({
          status: 'success',
          data: {
            teachers,
            total,
          },
        });
      } else {
        return res.status(500).json({ msg: 'Can not get teachers.' });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllTeacherById: async (req: Request, res: Response) => {
    try {
      const { teacherId } = req.params;
      const teacher = Teacher.findById({ teacher_id: teacherId });

      if (!teacher)
        return res.status(404).json({ msg: 'Teacher does not exist.' });

      return res.json(teacher);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeTeacher: async (req: Request, res: Response) => {
    try {
      const { teacherId } = req.params;
      const teacher = Teacher.findOneAndDelete({ teacher_id: teacherId });
      if (!teacher)
        return res.status(400).json({ msg: 'Teacher can not delete' });

      return res.status(200).json({ msg: 'Delete Success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTeacher: async (req: Request, res: Response) => { // update res object properties === object schema properties
    try {
      const data = req.body;

      let teacher = await Teacher.findById({
        teacher_id: req.params.teacherId,
      });
      if (!teacher)
        return res.status(400).json({ msg: 'Teacher can not update' });

      Object.assign(teacher, data);

      teacher = await teacher.save();

      return res.status(200).json({
        msg: 'Update success!',
        teacher: data,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default teacherController;
