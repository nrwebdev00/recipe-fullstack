import mongoose, { Schema } from 'mongoose';

const recipeImageSchema = mongoose.Schema(
    {
        recipe:{
            type: Schema.Types.ObjectId,
            ref:'Recipe',
            required: true
        },
        ImageUrl:{
            type: String,
            required: true,
        },
        desc:{
            type:String,
        }
    },
    {
        timestamps: true
    }
);

const RecipeImage = mongoose.model('RecipeImage', recipeImageSchema);
export default RecipeImage;