import { Router } from 'express';


import TrunkController from '../../controllers/application/trunk/Trunk.js';


const router = Router();


router.post(
    '/',
    TrunkController.post,
);


export default router;