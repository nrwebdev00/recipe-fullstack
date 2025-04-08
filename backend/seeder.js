import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import db from './Config/db.js';

dotenv.config({path: './seeder.env'});

// Load Models
import User from './Models/userModel.js';


// Connect To DB
db();



// Read JSON file
const users = JSON.parse(
    
);

// Import to DB
const importData = async ()=>{
    try{
        await User.create(users);
    } catch(err){
        console.log(err)
    }
}

// Delete Data in Data
const deleteData = async()=>{
    try{
        await User.deleteMany();

        console.log(`Data Destoyed...`.red);
    }catch(err){
        console.error(err)
    }
}

if (process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
}