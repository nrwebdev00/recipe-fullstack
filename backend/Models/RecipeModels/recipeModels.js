import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
        },
        detailsAbout: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        publish: {
            type: Boolean,
            required: true,
            default: false
        },
        visible: {
            type: String,
            enum: ['private', 'public', 'friendly'],
            required: true,
            default: 'private'
        },
        cuisine: {
            type: String,
            enum: [  "Italian",
                "Chinese",
                "Japanese",
                "Mexican",
                "Thai",
                "Indian",
                "French",
                "Spanish",
                "Greek",
                "American",
                "Korean",
                "Vietnamese",
                "Mediterranean",
                "Middle Eastern",
                "Brazilian",
                "Moroccan",
                "Ethiopian",
                "Peruvian",
                "Turkish",
                "German"
            ],
            required: true,
            default: 'American'
        },
        meal: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Brunch', 'Dinner', 'Apps'],
            required: true,
            Default: 'Lunch'
        },
        cookingLevel:{
            type: String,
            enum:['1','2','3','4','5'],
            required: true,
            default: '1'
        },
        SpiceLevel:{
            type: String,
            enum:['0','1','2','3','4','5'],
            required: true,
            default:'0',
        },
    },
    {
        timestamps: true
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema)
export default Recipe;