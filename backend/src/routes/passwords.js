import express from 'express';
import passwordController from '../controllers/passwordController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validate, passwordSchema } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', passwordController.getPasswords);
router.post('/', validate(passwordSchema), passwordController.savePassword);
router.delete('/', passwordController.deletePassword);

export default router;