const userModel=require('../models/user')



//******************  Update user   ************ */

async function updateUser(id,newData){
let  userUpdated= await userModel.userUpdated({_id:id},newData)
return userUpdated;
}


//************************ deleteUser  *********************************** */

async function deleteUser(id){
    let userDeleted= await userModel.userDeleted({_id:id})
return userDeleted;
}

// ********************** check if email exist ************************

async function check_email (email){
    email=email.toLowerCase();
    let response = await userModel.findOne({email:email})
    return response;
}    

//********************** register   ******************************************** */

async function register(user_data){
 
    user_data.email=user_data.email.toLowerCase();
    let new_user= await userModel.create(user_data)
return new_user;
}

//********************** get user data **************************************** */

async function getUserByEmail (email){
    email=email.toLowerCase();
    let existed_user_data = await userModel.findOne({email:email})
    return existed_user_data;    
}


//******************   get user by id ************************************* */

 async function getUserByID (id) {
    let user = await userModel.findOne({ _id: id });
    return user;

 }

 //****************** get all user********************************************************* */
async function getAllUser(){
let users = await userModel.find()
return users
}

module.exports={
    updateUser,
    deleteUser,
    check_email,
    register,
    getUserByEmail,
    getUserByID,
    getAllUser
}