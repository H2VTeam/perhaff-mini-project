import express from 'express';
import { courseController } from '../controllers';
import { authController, restrictTo } from '../controllers/auth.controller';
import { UserRole } from '../utils/constants';

const router = express.Router();

router.get('/', courseController.getAllCourse);
router.route('/:courseId').get(courseController.getCourseById);

router.use(authController.protect);
router.use(restrictTo([UserRole.ADMIN]));
router.post('/', courseController.createCourse);
router
  .route('/:courseId')

  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default router;
