import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        userName:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type:String,
            required: true,
            select: false
        },
        isStaff:{
            type: Boolean,
            required: true,
            default: false
        },
        isAdmin:{
            type: Boolean,
            required: true,
            default: false
        },
        profilePictureURL:{
            type:String,
            required: true,
            default:process.env.DEFAULT_USER_IMAGE
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

const User = mongoose.model('User', userSchema);
export default User;