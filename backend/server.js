import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// Config Imports
import db from './Config/db.js';

// Middleware Imports
import errorHandler from './Middleware/errorHandler.js';

// Routes Imports
import userRoutes from './Routes/userRoutes.js';
import userAdminRoutes from './Routes/userAdminRoutes.js';

dotenv.config();
db();
const app = express();

// Config Cloudinary for file storage
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secert: process.env.CLOUDINARY_API_SECRET
});

// Logging Setup
if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}

// Parser Data
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Middleware
app.use(cookieParser());

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/users-admin/', userAdminRoutes);

// Config Routes
app.get('/', (req,res) =>{
    res.send('Recipe API is running...');
})

// Static Files

// Error Middleware
app.use(errorHandler);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(
    `Server is running on ${PORT} and in ${process.env.NODE_ENV} mode.`.bgYellow.blue.bold
));