const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    name:{
       type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    }, 
    region:{
        type: String,
        require:true
    }, 
    town:{
        type: String,
        require:true
    }, 

    location:{
        type: String,
        require:true
    }, 

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },

    phone:{
        type:String,
        require:true
    },

    picture:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        default:0
    },
   
    
    dateCreated:{
        type:Date, 
        default: Date.now 
    },
})

EmployeeSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

EmployeeSchema.set('toJSON', {
    virtuals: true
})


exports.Product = mongoose.model("employee", EmployeeSchema)
