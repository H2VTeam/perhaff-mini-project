import express from 'express';
import { teacherController } from '../controllers';
import { authController, checkRole, restrictTo } from '../controllers/auth.controller';

import { UserRole } from '../utils/constants';

const router = express.Router();

router.use(authController.protect);

router.get('/', teacherController.getAllTeachers);

router
  .route('/:teacherId')
  .get(checkRole, teacherController.getAllTeacherById)
  .patch(checkRole, teacherController.updateTeacher);

router.use(restrictTo([UserRole.ADMIN, UserRole.TEACHER]));
router.get('/', teacherController.getAllTeachers);

router.use(restrictTo([UserRole.ADMIN]));
router.post('/', teacherController.createTeacher);
router.route('/:teacherId').delete(teacherController.removeTeacher);

export default router;
