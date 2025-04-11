import asyncHandler from 'express-async-handler';
import multer from 'multer';

import User from '../Models/userModel.js';
import ErrorResponse from '../Utlis/errorResponse.js';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Specify the folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Name the file uniquely
    },
});

// Initialize multer
const upload = multer({ storage: storage });

const profileImageUploader = asyncHandler(async (req, res, next) => {
    const uploadResults = await cloudinary.uploader
        .upload(req.file, { public_id: 'profile_image' })
        .catch((error) => {
            return next(new ErrorResponse('Error Uploading Image', 500))
        })
    console.log(uploadResults);
    res.status(200).json({
        success: true,
        data: { uploadResults }
    })
});

export { profileImageUploader }