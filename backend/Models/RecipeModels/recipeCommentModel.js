import mongoose, { Schema } from 'mongoose';

const recipeCommentSchema = mongoose.Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        recipe:{
            type: Schema.Types.ObjectId,
            ref:'Recipe',
            required: true
        },
        comment:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const RecipeComment = mongoose.model('RecipeComment', recipeCommentSchema);
export default RecipeComment;