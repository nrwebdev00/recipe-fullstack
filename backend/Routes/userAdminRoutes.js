import express from 'express';
import { getAllUsers, getSingleUser } from '../Controllers/userAdminController.js';
import { admin, protect, staff } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/all').get(protect, admin, getAllUsers);
router.route('/single/:id').get(protect, admin, getSingleUser);

export default router;