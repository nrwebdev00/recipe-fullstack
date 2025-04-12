import mongoose from 'mongoose';

import User from '../userModel.js';

const recipeSchema = mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {},
        detailsAbout: {},
        slug: {},
        publish: {},
        visible: {},
        cuisine: {},
        meal: {},
        tags: {},
    },
    {
        timestamps: true
    }
)