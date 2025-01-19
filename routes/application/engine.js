import { Router } from 'express';

// import adminSchema from '../../schema/adminSchema.js';
import DoorController from '../../controllers/application/engine/Engine.js';


const router = Router();


router.post(
    '/',
    DoorController.post,
);


export default router;