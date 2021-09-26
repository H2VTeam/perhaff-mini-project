import express from 'express';
import { studentController } from '../controllers';
import {
  authController,
  checkRole,
  restrictTo,
} from '../controllers/auth.controller';
import { UserRole } from '../utils/constants';

const router = express.Router();

router.use(authController.protect);

router
  .route('/:studentId')
  .get(checkRole, studentController.getStudentById)
  .patch(checkRole, studentController.updateStudent);

router.use(restrictTo([UserRole.ADMIN, UserRole.TEACHER]));
router.get('/', studentController.getAllStudent);

router.use(restrictTo([UserRole.ADMIN]));
router.post('/', studentController.createStudent);
router.route('/:studentId').delete(studentController.deleteStudent);

export default router;
