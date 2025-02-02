import { Router } from 'express';

import status from './status.js';
import engine from './engine.js';
const router = Router();


router.use('/status', status);
router.use('/engine', engine);
export default router;
