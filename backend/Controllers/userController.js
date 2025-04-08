import asyncHandler from 'express-async-handler';
import generateToken from '../Utlis/generateToken.js';
import User from '../Models/userModel.js';
import ErrorResponse from '../Utlis/errorResponse.js';


// @desc Register a New User
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req,res,next) =>{
    const { firstName, lastName, userName, email, password} = req.body;
    
    const userNameExists = await User.findOne({ userName })
    if(userNameExists){
        next(new ErrorResponse('User Name Aldready Exists.', 400));
    }

    const emailExists = await User.findOne({ email })
    if(emailExists){
        next(new ErrorResponse('Email is in use already.', 400))
    }

    const user = await User.create({ firstName, lastName, userName, email, password })
    if(user){
        sendTokenResponse(user,200,res);
    } else {
        next(new ErrorResponse('Invalid user data', 400))
    }
});

// @desc Login and Get JWT 
// @route POST /api/users/login
// @access PUBLIC
const loginUser = asyncHandler(async(req,res,next) =>{
    const { userName, password} = req.body;
    const user = await User.findOne({ userName });
    if(user && await user.matchPassword(password)){
        sendTokenResponse(user,200,res);
    } else {
        next(new ErrorResponse('Ivalid Username or Password', 403))
    }
});

// @desc Get User Profile 
// @route GET /api/users
// @access PRIVATE - login
const userProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            success: true,
            user,
        })
    } else {
        next(new ErrorResponse('User not found', 401));
    }
});

// @desc Update User Profile
// @route PUT /api/users
// @access PRIVATE - login
const upadteUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id);

    // Check if New email if Exists Already
    if(req.body.email){
        const checkEmail = await User.findOne({email: req.body.email})
        if(checkEmail){
            next(new ErrorResponse('Email Already Exists', 400));
        }
    }

    if(user){ 
        user.firstName = req.body.firstName | user.firstName
        user.lastName = req.body.lastName | user.lastName
        user.email = req.body.email | user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updateduser = await user.save()
        sendTokenResponse(upadteUser,200,res);
    } else {
        next(new ErrorResponse('User Not Found', 400));
    }
});

const sendTokenResponse = (user, statusCode, res) =>{
    const token = generateToken(user._id);

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*1000,
        ),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}

export {registerUser, loginUser, userProfile, upadteUser}