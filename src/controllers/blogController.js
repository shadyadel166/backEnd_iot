const blogModel= require('../models/blog');


//**********************  update blog  ******************************************* */

async function updateBlog(id,newData){
    let updateBlog=await blogModel.updateOne({_id:id}, newData);
    return updateBlog;
}

//******************** check if blog is exist ************************************** */
async function isBlogExist(id){
    let response=await blogModel.findById(id);
    return response;
}

//********************** delete blog **************************************** */

async function deleteBlog(id){
    let deleteBlog=await blogModel.deleteOne({_id:id});
    return deleteBlog;
}

//******************** create blog ************************************* */

async function createBlog(blog){
    let createBlog=await blogModel.create(blog);
    return createBlog;

}
async function getImageBlog(file){
    let pathLink ="http://localhost:5000/"+file.filename;
    return pathLink
}

//******************* get blog data**************************** */
//*********************get all blog  *********************************** */

async function getAllBlog(){
    let allBlog=await blogModel.find();
    return allBlog;

}

//****************** get blog by id ************************************* */

async function getBlogByID(id){
    let blogById=await blogModel.findOne({_id:id});
    return blogById;

}

//******************* get blog by title ************************************* */

async function getBlogByTitle(title){
    let blogByTitle=await blogModel.find({ title: { $regex: title, $options: "i" } });
    return blogByTitle;

}

//****************** get blog by author ************************************* */

async function getBlogByAuthor(userId){
let blogByUerId=await blogModel.find({userId:userId});
return blogByUerId;
}










module.exports={
    updateBlog,
    deleteBlog,
    createBlog,
    getAllBlog,
    getBlogByID,
    getBlogByTitle,
    getBlogByAuthor,
    getImageBlog,
    isBlogExist,
}

