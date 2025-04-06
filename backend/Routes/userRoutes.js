import express from 'express';

import { registerUser } from '../Controllers/userController.js';
import { admin, protect, staff } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);

export default router;