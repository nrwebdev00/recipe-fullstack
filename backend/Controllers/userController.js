import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import generateToken from '../Utlis/generateToken.js';
import User from '../Models/userModel.js';
import ErrorResponse from '../Utlis/errorResponse.js';
import sendEmail from '../Utlis/sendEmail.js';


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
    const user = await User.findOne({ userName }).select("+password");
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
        const checkEmail = await User.findOne({email: req.body.email}).select("+password");
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

// @desc Forgot Password
// @routes POST api/users/forgotpassword
// @access PUBLIC
const forgotpassword = asyncHandler(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email}).select("+password");

    if(user){
        // Create Reset Token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const TokenExpireDate = Date.now() + 10*60*1000;

        // Place Token in user
        user.resetPasswordToken = hashedResetToken;
        user.resetPasswordExpire = TokenExpireDate;

        // Save the update info into updatedUser
        const updatedUser = await user.save()
        if(!updatedUser){
            next(new ErrorResponse('Invaild Data', 400))
        }

        // Send Email With Token To Reset Password
        const resetURL = `${req.protocol}://${req.get('host')}/api/users/forgotpassword/${resetToken}`;
        const message = `You are receiving this email, because a forgot password requested has began. Please make a PUT request to: \n\n${resetURL}`;
        try{
            await sendEmail({
                email: user.email,
                subject: 'Password reset token',
                message
            });
            res.status(200).json({
                success: true,
                data: `Email sent to ${user.email}`
            });
        }catch(err){
            console.error(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false })
            return next(new ErrorResponse('Email could not be sent', 500))
        }

        res.status(200).json({
            success: true,
            updatedUser
        })
    }else{
        next(new ErrorResponse(`User with email address of ${req.body.email} is not found.`,404))
    }
});

// @desc Update Password with token 
// @route PUT /api/users/forgotpassword/:token
// @access PUBLIC
const resetPassword = asyncHandler(async(req,res,next)=>{
    // Get token and Hash token
    const token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    // Get User By token and valiadate Exprie in Time
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: {$gt: Date.now() }
    });

    // Check if user was found if not send err
    if(!user){
        return next(new ErrorResponse('Invalid Token', 400));
    }

    // Save Password and remove token from db
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save();
    user.select("-password")

    sendTokenResponse(user=user,200,res);
    
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

export {registerUser, loginUser, userProfile, upadteUser, forgotpassword, resetPassword}