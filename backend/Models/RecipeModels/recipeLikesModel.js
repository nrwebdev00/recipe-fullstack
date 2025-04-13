import mongoose, { Schema } from 'mongoose';

const recipeLikesSchema = mongoose.Schema(
    {
        recipe: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Recipe'
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        Like: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const RecipeLikes = mongoose.model('RecipeLikes', recipeLikesSchema);
export default RecipeLikes;