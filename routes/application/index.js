import { Router } from 'express';
import door from './door.js';
import trunk from './trunk.js';
import engine from './engine.js';
import light from './light.js';
import status from './status.js';

const router = Router();

router.use('/door', door);
router.use('/trunk', trunk);
router.use('/engine', engine);
router.use('/light', light);
router.use('/status', status);

export default router;
