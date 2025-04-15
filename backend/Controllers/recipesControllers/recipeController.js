import asyncHandler from 'express-async-handler';

import Recipe from '../../Models/RecipeModels/recipeModels.js';
import ErrorResponse from '../../Utlis/errorResponse.js';

import User from '../../Models/userModel.js';

// @desc Get All Recipes that are Published and public
// @route GET /api/recipes
// @access PUBLIC
const getAllPublishPublicRecipes = asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.find({ publish: true, visible: 'public' });
    res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes
    });
});

// @desc Get Single Recipe by ID --> Published and public
// @route GET /api/recipes/:id
// @access PUBLIC
const getSinglePublishPublicRecipe = asyncHandler(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
        if (recipe.publish && recipe.visible == 'public') {
            res.status(200).json({
                success: true,
                recipe
            })
        } else {
            return next(new ErrorResponse('Recipe Not Found', 404));
        }
    } else {
        return next(new ErrorResponse('Recipe Not Found', 404));
    }
});

// @desc Get All Recipes by user
// @route GET /api/recipes/user/:id
// @access PRIVATE - login
const getSinglePrivateRecipe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse('Please Login', 401))
    }
    console.log(user._id)
    console.log(recipe.author._id)
    if (user._id !== recipe.author) {
        return next(new ErrorResponse('Please Contact Owner of Recipe to access it.', 403));
    }

    res.status(200).json({
        success: true,
        recipe,
        user

    })
});

// @desc Get Single Recipe by user
// @route GET /api/recipes/user/:id
// @access PRIVATE - login
const createPrivateRecipe = asyncHandler(async (req, res, next) => {
    const { userID, title, detailsAbout, publish, visible, cuisine, meal, cookingLevel, spiceLevel, recipeTags } = req.body;
    const user = await User.findById(userID);

    if (user) {

        // Create Slug and Check if Slug is Unique
        const slugTitle = title.replaceAll(' ', '-');
        const slugAuthor = user.firstName.replaceAll(' ', '-');
        const slug = `${slugTitle}-${slugAuthor}`.toLowerCase();

        const slugExist = await Recipe.findOne({ slug });
        if (slugExist) { return next(new ErrorResponse('Please Change title as title is already in use by you.', 400)) }

        // Create Recipe
        const recipe = await Recipe.create({
            author: user,
            title,
            slug,
            detailsAbout,
            publish,
            visible,
            cuisine,
            meal,
            cookingLevel,
            spiceLevel,
        })
        if (recipe) {
            res.status(200).json({
                success: true,
                recipe
            })
        } else {
            return next(new ErrorResponse("Invalid Data", 400));
        }
    } else {
        return next(new ErrorResponse('User Not Found, Please Login', 403));
    }
});

// @desc Create New Recipe
// @route POST /api/recipes
// @access PRIVATE - login

// @desc Update Recipe by ID
// @route PUT /api/recipes/:id
// @access PRIVATE - login

// @desc Remove Recipe cascade all other objects of Recipe
// @route DELETE /api/recipes/:id
// @access PRIVATE - login

export {
    getAllPublishPublicRecipes,
    getSinglePublishPublicRecipe,
    getSinglePrivateRecipe,
    createPrivateRecipe
}