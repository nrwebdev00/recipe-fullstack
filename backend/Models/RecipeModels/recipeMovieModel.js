import mongoose from 'mongoose';

const recipeMovieSchema = mongoose.Schema(
    {
        recipe: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        MovieUrl: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const RecipeMovie = mongoose.model('RecipeMovie', recipeMovieSchema);
export default RecipeMovie;