import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Student from '../models/student.schema';

const studentController = {
  createStudent: async (req: Request, res: Response) => {
    try {
      const { fullName, studentId, classIds } = req.body;

      const student = await Student.findOne({ student_id: studentId });

      // Check student exist
      if (student)
        return res.status(400).json({ msg: 'Student already exist.' });

      // Create new student
      const newStudent = await Student.create({
        full_name: fullName,
        student_id: studentId,
        class_ids: classIds,
      });

      return res.json({
        msg: 'Create success!',
        student: newStudent,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStudentById: async (req: Request, res: Response) => {
    try {
      const student = await Student.findOne({
        student_id: req.params.studentId,
      });

      // Check student exists
      if (!student)
        return res.status(400).json({ msg: 'Student does not exist.' });

      return res.json(student);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllStudent: async (req: Request, res: Response) => {
    try {
      const { offset, limit } = req.query;

      if (limit && offset) {
        let students: Document[] = [];
        let countStudent = 0;

        countStudent = await Student.countDocuments();
        students = await Student.find()
          .limit(parseInt(limit as string, 10))
          .skip(parseInt(offset as string, 10));

        res.status(201).json({
          status: 'success',
          data: {
            students,
            total: countStudent,
          },
        });
      } else {
        return res.status(500).json({ msg: 'Can not get students.' });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStudent: async (req: Request, res: Response) => {
    try {
      const { fullName, classIds } = req.body;

      const student = await Student.findOneAndUpdate(
        { student_id: req.params.studentId },
        { full_name: fullName, class_ids: classIds }
      );

      // Check student exist
      if (!student)
        return res.status(400).json({ msg: 'Student can not update.' });

      return res.json({ msg: 'Update success!', student });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteStudent: async (req: Request, res: Response) => {
    try {
      const student = await Student.findOneAndDelete({
        student_id: req.params.studentId,
      });

      // Check student exist
      if (!student)
        return res.status(400).json({ msg: 'Student can not delete.' });

      return res.json({
        msg: 'Delete success!',
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default studentController;
