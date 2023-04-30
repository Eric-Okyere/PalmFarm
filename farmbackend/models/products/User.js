const mongoose = require("mongoose")
// const {Schema} = mongoose;


const userSchema = mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
})
exports.User = mongoose.model("User", userSchema)
exports.userSchema= userSchema;
