import { Router } from 'express';


import EngineController from '../../controllers/hardware/engine/Engine.js';


const router = Router();


router.post(
    '/',
    EngineController.post,
);


export default router;