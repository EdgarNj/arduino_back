import { Router } from 'express';

import status from './status.js';

const router = Router();


router.use('/status', status);

export default router;
