import { Router } from 'express';

// import adminSchema from '../../schema/adminSchema.js';
import DoorController from '../../controllers/application/door/Door.js';


const router = Router();


router.post(
    '/',
    DoorController.post,
);


export default router;