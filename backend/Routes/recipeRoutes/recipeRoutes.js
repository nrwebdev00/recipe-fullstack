import express from 'express';

import { 
    getAllPublisPublicRecipes
 } from '../../Controllers/recipesControllers/recipeController.js';
 import { protect, admin, staff } from '../../Middleware/authMiddleware.js';

 const router = express.Router();

 router.route('/').get(getAllPublisPublicRecipes);

 export default router;