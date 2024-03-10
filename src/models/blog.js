const mongoose =require('mongoose');
 
//schema blog

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

})

module.exports = mongoose.model('Blog',blogSchema);