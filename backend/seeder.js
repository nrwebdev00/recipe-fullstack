import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import db from './Config/db.js';

dotenv.config();

// Load Models
import User from './Models/userModel.js';
import Recipe from './Models/RecipeModels/recipeModels.js';

db();



// Read JSON file
const users = JSON.parse(
    fs.readFileSync(`./Config/SeederData/userSeeder.json`, 'utf-8')
);

const recipes = JSON.parse(
    fs.readFileSync(`./Config/SeederData/recipeSeeder.json`, 'utf-8')
);

// Import to DB
const importData = async () => {
    try {
        await User.create(users);
        await Recipe.create(recipes);
        console.log(`Data Imported...`.green);
        return;
    } catch (err) {
        console.log(err)
    }
}

// Delete Data in Data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Recipe.deleteMany();
        console.log(`Data Destroyed...`.red);
        return;
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}