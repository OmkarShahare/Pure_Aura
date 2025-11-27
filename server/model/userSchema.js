const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    custName:{
        type:String,
        required:true,
    },
    service:{
        type:String,
        required:true,
    },
    hands:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
})

const SpaUser=mongoose.model('SPAUSER',userSchema);

module.exports=SpaUser;