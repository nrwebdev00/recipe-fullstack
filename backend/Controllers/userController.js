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
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Data')
    }
})


export {registerUser}