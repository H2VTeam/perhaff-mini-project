import express from 'express';
import { courseController } from '../controllers';

const router = express.Router();

router.get('/', courseController.getAllCourse);
router.post('/', courseController.createCourse);
router
  .route('/:courseId')
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default router;
