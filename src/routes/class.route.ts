import express from 'express';
import { classController } from '../controllers';
import { authController, restrictTo } from '../controllers/auth.controller';
import { UserRole } from '../utils/constants';

const router = express.Router();

router.get('/', classController.getAllClasses);
router.route('/:classId').get(classController.getAllClassById);

router.use(authController.protect);
router.use(restrictTo([UserRole.ADMIN]));
router.post('/', classController.createClass);
router
  .route('/:classId')

  .patch(classController.updateClass)
  .delete(classController.removeClass);

export default router;
