import express from 'express';
import { registerUser, loginUser, 
    userProfile, upadteUser } from '../Controllers/userController.js';
import { admin, protect, staff } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, userProfile)
    .put(protect, upadteUser)
;
router.route('/login').post(loginUser);

export default router;