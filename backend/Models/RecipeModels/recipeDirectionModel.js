import mongoose from 'mongoose';

const recipeDirectionSchema = mongoose.Schema(
    {
        recipe:{
            type: Schema.Types.ObjectId,
            required: true,
            ref:'Recipe'
        },
        directionTitle:{
            type: String,
            required: true
        },
        directionDetail:{
            type: String,
            required: true
        },
        directionNumber:{
            type: Number,
            required: true,
        },
        TimeUnits:{
            type: String,
            enum:['seconds','minutes','hours','days'],
            required: true,
            default:'minutes'
        },
        TimeToComplete:{
            type: Number,
            required: true,
            default: 5 
        }
    },
    {
           timestamps: true
    }
)

const RecipeDirection = mongoose.model('RecipeDirection', recipeDirectionSchema);
export default RecipeDirection;