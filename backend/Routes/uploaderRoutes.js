import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';


import { protect, } from '../Middleware/authMiddleware.js';
import ErrorResponse from '../Utlis/errorResponse.js';
import User from '../Models/userModel.js';


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

const router = express.Router();

// Upload Profile Image
router.post('/profileImageUploader', protect, upload.single('file'), async (req, res, next) => {
    let public_id = `RecipeApp/ProfileImg/${req.file.filename}`;
    const result = await cloudinary.uploader.upload(`./uploads/${req.file.filename}`);
    const url = cloudinary.url(result.public_id, {
        transformation: [
            {
                quality: 'auto',
                fetch_format: 'auto'
            },
            {
                width: 600,
                height: 600
            }
        ]
    })
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    user.profilePictureURL = url;
    user.save();

    try {
        fs.unlinkSync(`./uploads/${req.file.filename}`);
        console.log('file deleted');
    } catch (err) {
        console.error(err);
        return next(new ErrorResponse('File delete not working', 500));
    }

    res.status(200).json({
        success: true,
        user,
    })
});

export default router;