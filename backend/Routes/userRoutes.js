import express from 'express';
import { registerUser, loginUser, 
    userProfile, upadteUser, forgotpassword, resetPassword } from '../Controllers/userController.js';
import { admin, protect, staff } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, userProfile)
    .put(protect, upadteUser)
;
router.route('/login').post(loginUser);
router.route('/forgotpassword').post(forgotpassword);
router.route('/forgotpassword/:token').put(resetPassword)

export default router;