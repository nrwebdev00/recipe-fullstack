import express from 'express';

import {
    getAllPublishPublicRecipes,
    getSinglePublishPublicRecipe,
    getSinglePrivateRecipe,
    createPrivateRecipe
} from '../../Controllers/recipesControllers/recipeController.js';
import { protect, admin, staff } from '../../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllPublishPublicRecipes);
router.route('/:id').get(getSinglePublishPublicRecipe);
router.route('/user/:id').get(protect, getSinglePrivateRecipe);
router.route('/user').post(protect, createPrivateRecipe);

export default router;