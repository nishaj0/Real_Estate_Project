import express from 'express';
import { signup, login, googleAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', login);
router.post('/google', googleAuth);

export default router;
