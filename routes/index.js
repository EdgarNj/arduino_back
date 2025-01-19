import { Router } from 'express';
import hardware from './hardware/index.js';
import application from './application/index.js';

const router = Router();

router.use('/api/hardware', hardware);
router.use('/api/application', application);

export default router;
