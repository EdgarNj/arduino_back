import { Router } from 'express';

// import adminSchema from '../../schema/adminSchema.js';
import HornController from '../../controllers/application/horn/Horn.js';


const router = Router();


router.post(
    '/',
    HornController.post,
);


export default router;