import mongoose, { Schema } from 'mongoose';

const recipeIngredientSchema = mongoose.Schema(
    {
        recipe:{
            type: Schema.Types.ObjectId,
            required: true,
            ref:'Recipe'
        },
        ingredient:{
            type: String,
            required: true
        },
        measurementType:{
            type: String,
            enum:['t','T','fl oz','cup','pint','quart','gallon','pound','ounce','each','dozen'],
            required: true,
            default: 'each'
        },
        measurementAmount:{
            type: Number,
            required: true,
            default: 0
        },
        ingredientIamgeURL:{
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const RecipeIngredient = mongoose.model('RecipeIngredient', recipeIngredientSchema);
export default RecipeIngredient