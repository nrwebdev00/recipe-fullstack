import crypto from 'crypto';
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
        resetPasswordToken:{
            type:String
        },
        resetPasswordExpire:{
            type:Date
        },
        confirmEmailToken:{
            type: String
        },
        confirmEmailExprie:{
            type: String
        },
        isEmailConfirmed:{
            type: Boolean,
            required:true,
            default: false
        },
        profilePictureURL:{
            type:String,
            required: true,
            default:'https://res.cloudinary.com/dnrlolvnu/image/upload/v1744132604/default_user_eut07j.jpg'
        },
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

// Generate and hash password Token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash toke and set resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 10 *60*1000;
    return resetToken;

}

const User = mongoose.model('User', userSchema);
export default User;