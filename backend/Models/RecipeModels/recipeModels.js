import mongoose from 'mongoose';

import User from '../userModel.js';

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
            Type: String,
            Enum: ['private', 'public', 'friendly'],
            required: true,
            default: 'private'
        },
        cuisine: {
            Type: String,
            Enum: ['American', 'Mexican'],//list of all cuisine
            required: true,
            default: 'American'
        },
        meal: {
            Type: String,
            Enum: ['Breakfast', 'Lunch', 'Brunch', 'Dinner', 'Apps'],
            required: true,
            Default: 'Lunch'
        },
        tags: {},
    },
    {
        timestamps: true
    }
)