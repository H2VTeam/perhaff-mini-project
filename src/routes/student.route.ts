import express from 'express';
import { studentController } from '../controllers';

const router = express.Router();

router.get('/', studentController.getAllStudent);
router.post('/', studentController.createStudent);
router
  .route('/:studentId')
  .get(studentController.getStudentById)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

export default router;
