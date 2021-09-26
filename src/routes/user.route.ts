import express from 'express';
import { authController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);

export default router;
