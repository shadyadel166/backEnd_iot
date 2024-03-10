const commentModel=require('../models/comment')



//**************** delete comment ********************************************** */

async function deleteComment(id){
    let deleteBlog=await commentModel.deleteOne({_id:id});
    return deleteBlog;
}

//************  create comment *********************************************** */

async function createComment(comment){
    let createComment=await commentModel.create(comment);
    return createComment;

}


//*************** get all comment by blog id************************************************** */

async function getAllCommentByBlogId(id){
    let allComment=await commentModel.find({blogId:id});
    return allComment; 
}





module.exports={deleteComment,createComment,getAllCommentByBlogId}
