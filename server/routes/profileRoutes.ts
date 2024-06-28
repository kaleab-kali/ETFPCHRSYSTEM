import express from 'express';
import { getProfile } from '../controllers/profileController';
import authenticate from '../middleware/accessControl/authenticate';
import authorize from '../middleware/accessControl/authorize';

const router = express.Router();

router.get('/', authenticate, authorize, getProfile);

export default router;
