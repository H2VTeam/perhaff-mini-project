import express from 'express';
import { authController } from '../controllers/auth.controller';
import teacherController from '../controllers/teacher.controller';

const router = express.Router();

router.use(authController.protect);

router.get('/', teacherController.getAllTeachers);

export default router;
