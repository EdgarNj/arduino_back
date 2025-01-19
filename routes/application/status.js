import { Router } from 'express';


import StatusController from '../../controllers/application/status/Status.js';


const router = Router();


router.get(
    '/',
    StatusController.get,
);


export default router;