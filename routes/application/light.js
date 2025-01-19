import { Router } from 'express';

// import adminSchema from '../../schema/adminSchema.js';
import LightController from '../../controllers/application/light/Light.js';


const router = Router();


router.post(
    '/',
    LightController.post,
);


export default router;