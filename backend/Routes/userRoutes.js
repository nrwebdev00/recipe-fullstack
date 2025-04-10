import express from 'express';
import { 
    registerUser, 
    loginUser, 
    userProfile, 
    upadteUser, 
    forgotpassword, 
    resetPassword, 
    logoutUser, 
    confirmEmailAddress,
    profileImageUpload
} from '../Controllers/userController.js';
import { admin, protect, staff } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, userProfile)
    .put(protect, upadteUser)
;
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotpassword').post(forgotpassword);
router.route('/forgotpassword/:token').put(resetPassword);
router.route('/confirmEmail/:token').put(protect, confirmEmailAddress);
router.route('/uploadProfileImage').put(protect, profileImageUpload);

export default router;