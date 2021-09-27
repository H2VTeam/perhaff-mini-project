import { Request, Response } from 'express';
import Teacher from '../models/teacher.schema';
const teacherController = {
  getAllTeachers: async (req: Request, res: Response) => {
    try {
      const { limit, offset } = req.query;
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
        return res.status(500).json({ msg: 'Can not get students.' });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default teacherController;
