import mongoose from 'mongoose';

const db = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB connected: ${conn.connection.host}.`.bgBlue.yellow.bold)
    } catch (error){
        console.error(`DB Config => Error: ${error.message}`.brightRed.underline.bold);
    }
}

export default db;