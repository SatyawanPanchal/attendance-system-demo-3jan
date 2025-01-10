import mongoose from 'mongoose'
const userSchema= new mongoose.Schema({
    userName:{type:String,required:true},
    emailId:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum: ['admin', 'teacher', 'parent', 'principal', 'student'],
        required:true,
        default: 'student',
    },
},
{ timestamps: true });

const userModel=mongoose.models.users||mongoose.model("users",userSchema);
export default userModel;