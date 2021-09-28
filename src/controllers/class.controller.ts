import { Request, Response } from 'express';
import Class from '../models/class.schema';

const classController = {
  createClass: async (req: Request, res: Response) => {
    // create res object properties === object schema properties
    try {
      const data = req.body;
      const _class = await Class.findOne({ class_id: data.class_id });
      if (!_class) return res.status(400).json({ msg: 'Class already exist.' });
      return res.json({
        msg: 'Create success!',
        class: await Class.create(data),
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllClasses: async (req: Request, res: Response) => {
    try {
      const { limit, offset } = req.query; // pagination
      if (limit && offset) {
        let classes = [];
        let total: number = 0;
        total = await Class.countDocuments();
        classes = await Class.find()
          .limit(parseInt(limit as string, 10))
          .skip(parseInt(offset as string, 10));

        res.status(201).json({
          status: 'success',
          data: {
            classes,
            total,
          },
        });
      } else {
        return res.status(500).json({ msg: 'Can not get classes.' });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllClassById: async (req: Request, res: Response) => {
    try {
      const { classId } = req.params;
      const _class = Class.findById({ class_id: classId });

      if (!_class)
        return res.status(404).json({ msg: 'Class does not exist.' });

      return res.json(_class);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeClass: async (req: Request, res: Response) => {
    try {
      const { classId } = req.params;
      const _class = Class.findOneAndDelete({ class_id: classId });
      if (!_class) return res.status(400).json({ msg: 'Class can not delete' });

      return res.status(200).json({ msg: 'Delete Success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateClass: async (req: Request, res: Response) => {
    // update res object properties === object schema properties
    try {
      const data = req.body;

      let _class = await Class.findById({
        class_id: req.params.classId,
      });
      if (!_class) return res.status(400).json({ msg: 'Class can not update' });

      Object.assign(_class, data);

      _class = await _class.save();

      return res.status(200).json({
        msg: 'Update success!',
        class: data,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default classController;
