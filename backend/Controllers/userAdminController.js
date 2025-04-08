import asyncHandler from 'express-async-handler';
import ErrorResponse from '../Utlis/errorResponse.js';
import User from '../Models/userModel.js';

// @desc Admin Get All  Users
// @route GET /api/users-admin/all
// @access PRIVATE - admin Only
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})

    res.status(200).json({
        success:true,
        users
    })
})

// @desc Admin Get Single User
// @route GET /api/users-admin/single/:id
// @access PRIVATE - admin Only
const getSingleUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).json({
            success:true,
            user
        })
    }else{
        next(new ErrorResponse('Not Found', 404))
    }
})

// @desc Delete User 
// @route DELETE /api/user-admin/:id
// @access PRIVATE - admin only

export {getAllUsers, getSingleUser}