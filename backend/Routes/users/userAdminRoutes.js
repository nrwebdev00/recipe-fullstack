import express from 'express';
import {
    getAllUsers,
    getSingleUser,
    deleteUser,
    createUser,
    updateUser
} from '../../Controllers/users/userAdminController.js';
import { admin, protect, staff } from '../../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createUser);
router.route('/all').get(protect, admin, getAllUsers);
router.route('/single/:id').get(protect, admin, getSingleUser);
router.route('/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUser);

export default router;