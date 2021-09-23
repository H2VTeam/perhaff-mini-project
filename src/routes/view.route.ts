import express from 'express';
import { viewController } from '../controllers';

const router = express.Router();

router.get('/', viewController.getHome);

export default router;
