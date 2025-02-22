//importing mongoose
const mongoose=require('mongoose')


//creating a schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    }
})


// craeting and exporting the model
module.exports=mongoose.model('User',userSchema)