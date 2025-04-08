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
});

// @desc Admin Get Single User
// @route GET /api/users-admin/single/:id
// @access PRIVATE - admin Only
const getSingleUser = asyncHandler(async(req,res,next) =>{
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).json({
            success:true,
            user
        })
    }else{
        next(new ErrorResponse('Not Found', 404))
    }
});

// @desc Delete User Admin
// @route DELETE /api/user-admin/:id
// @access PRIVATE - admin only
const deleteUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(user){
        await User.deleteOne({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: `User removed with an id of ${req.params.id}`
        })
    }else{
        next(new ErrorResponse(`User not found with an id of ${req.params.id}.`, 404));
    }
});

// @desc Create User Admin
// @route POST /api/user-admin/
// @access PRIVATE - admin only
const createUser=asyncHandler(async(req,res,next) =>{
    const {firstName,lastName,userName,email,isStaff,isAdmin} = req.body;

    // Check if Email Exists and if so res iwth err
    const emailExists = await User.findOne({email});
    if(emailExists) next(new ErrorResponse(`Email of ${email} is in use already.`));

    const userNameExists = await User.findOne({userName});
    if(userNameExists) next(new ErrorResponse(`User Name of ${userName} is in use already.`));

    // Have Genric Password so user must Change on First login
    const user = await User.create({ firstName,lastName,userName,email,isStaff,isAdmin,password:"ChangeME101"})
    if(user){
        res.status(200).json({
            success:true,
            message: `New User Created with a user name of ${user.userName}`
        });
    }else{
        next(new ErrorResponse('Invalid Data',400));
    }
});

// @desc Update user by Admin
// @route PUT /api/user-admin/:id
// @access PRIVATE - admin only
const updateUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(req.body.email){
        const checkEmailExists = await User.find({email: req.body.email});
        if(checkEmailExists){
            next(new ErrorResponse(`Email address of ${req.body.email} is already in use.`))
        }
    }

    if(user){
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.isStaff = req.body.isStaff || user.isStaff
        user.isAdmin = req.body.isAdmin || user.isAdmin
    }
    const upatedUser = await user.save()
    
    res.status(200).json({
        success:true,
        message: `User with user name of ${upatedUser.userName} has been updated.`
    });
});

export {getAllUsers, getSingleUser,deleteUser,createUser,updateUser}


