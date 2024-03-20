const commentModel=require('../models/comment')

const userModel=require('../models/user')

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
    let allComment=await commentModel.find({blogId:id})    
      .populate({ path: "userId", select: "fullName" })
      .exec();
      console.log(allComment)
      return allComment; 
      
}
//**************************************** get comment by Id************************************************************ */
async function getCommentById(id){
    let comment=await commentModel.findOne({_id:id});
    return comment;
}



module.exports={deleteComment,createComment,getAllCommentByBlogId,getCommentById}
