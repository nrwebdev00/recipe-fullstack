import mongoose from 'mongoose';

const recipeArticleSchema = mongoose.Schema(
    {
        recipe:{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        title:{
            type: String,
            required: true,
            unquie: true,
            maxLength: [255, 'Please Limit Your Title to 255 characters']
        },
        slug:{
            type:String,
            required: true,
            unquie: true,
        },
        text:{
            type:String,
        },
        html:{
            type: String, 
            required: true
        },
        imageUrl:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const RecipeArticles = mongoose.model('RecipeArticles', recipeArticleSchema);
export default RecipeArticles;