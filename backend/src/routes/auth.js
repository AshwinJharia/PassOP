import express from 'express';
import authController from '../controllers/authController.js';
import { validate, userSchema } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validate(userSchema), authController.register);
router.post('/login', validate(userSchema), authController.login);

export default router;