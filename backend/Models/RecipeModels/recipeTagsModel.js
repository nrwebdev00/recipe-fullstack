import mongoose, { Schema } from 'mongoose';

const recipeTagsSchema = mongoose.Schema(
    {
        recipe:{
            type: Schema.Types.ObjectId,
            ref: 'recipe',
            required: true
        },
        tag:{
            type: String,
            required: true,
            maxLength: [50, 'Tag Must be less than 50 Characters']
        }
    },
    {
        timestamps: true
    }
)

const RecipeTags = mongoose.model('RecipeTags', recipeTagsSchema);
export default RecipeTags;