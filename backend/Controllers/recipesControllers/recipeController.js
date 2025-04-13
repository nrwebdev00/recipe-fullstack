import asyncHandler from 'express-async-handler';

import Recipe from '../../Models/RecipeModels/recipeModels.js';
import ErrorResponse from '../../Utlis/errorResponse.js';

// @desc Get All Recipes that are Published and public
// @route GET /api/recipes
// @access PUBLIC
const getAllPublisPublicRecipes = asyncHandler(async(req,res,next)=>{
    const recipes = await Recipe.findAll({});

    res.status(200).json({
        success: true,
        data: recipes
    })
});

// @desc Get Single Recipe by ID --> Published and public
// @route GET /api/recipes/:id
// @access PUBLIC

// @desc Get All Recipes by user
// @route GET /api/recipes/user
// @access PRIVATE - login

// @desc Get Single Recipe by user
// @route GET /api/recipes/user/:id
// @access PRIVATE - login

// @desc Create New Recipe
// @route POST /api/recipes
// @access PRIVATE - login

// @desc Update Recipe by ID
// @route PUT /api/recipes/:id
// @access PRIVATE - login

// @desc Remove Recipe cascade all other objects of Recipe
// @route DELETE /api/recipes/:id
// @access PRIVATE - login

export { getAllPublisPublicRecipes }