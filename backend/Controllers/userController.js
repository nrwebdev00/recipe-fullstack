import asyncHandler from 'express-async-handler';

import generateToken from '../Utlis/generateToken.js';
import User from '../Models/userModel.js';

// @desc Register a New User
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req,res) =>{
    const { firstName, lastName, userName, email, password} = req.body;
    
    const userExists = await User.findOne({ userName })
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists');
    }

    const emailExists = await User.findOne({ email })
    if(emailExists){
        res.status(400)
        throw new Error('Email is already in use');
    }

    const user = await User.create({ firstName, lastName, userName, email, password })
    if(user){
        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isStaff: user.isStaff,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Data')
    }
});

// @desc Login and Get JWT 
// @route POST /api/users/login
// @access PUBLIC
const loginUser = asyncHandler(async(req,res) =>{
    const { userName, password} = req.body;
    const user = await User.findOne({ userName });
    if(user && await user.matchPassword(password)){
        res.status(200).json({
            _id:user._id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isStaff: user.isStaff,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401)
        throw new Error('Invaild user Name or Password');
    }
});

// @desc Get User Profile 
// @route GET /api/users
// @access PRIVATE - login
const userProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isStaff: user.isStaff,
            isAdmin : user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
})

// @desc Delete User 
// @route DELETE /api/user/:id
// @access PRIVATE - admin only



export {registerUser, loginUser, userProfile}