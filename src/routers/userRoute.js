const userController = require("../controllers/userController");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../shared/auth");
const fs = require("fs");
let secret= fs.readFileSync("secret.key");

//************* register **************************************************** */

route.post("/register", async function (req, res) {
  console.log(req.body);
  if (
    req.body.fullname == "" ||
    req.body.email == "" ||
    req.body.password == "" ||
    req.body.phoneNumber == "" ||
    req.body.address == "" ||
    req.body.nationalId == ""
  ) {
    res.json({
      message: "Error : you should insert valid values",
      status: 400,
      data: req.body,
      success: false,
    });
  } else {
    let exist = await userController.check_email(req.body.email);
    if (exist) {
      res.json({
        message: "email aready exist",
        status: 400,
        data: exist,
        success: false,
      });
    } else {
     
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword
      let new_user = await userController.register(req.body);
      res.json({
        message: "Successfull regestration go to sign in",
        status: 200,
        data: new_user,
        success: true,
      });
    }
  }
});

//***************************** login ***************************************************** */

route.post("/login", async function (req, res) {
  console.log(req.body);
  const user = await userController.getUserByEmail(req.body.email);

  if (!user) {
    res.json({
      massage: "you are not an user",
      status: 401,
      data: req.body,
      success: false,
    });
  } else {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isValidPassword) {
      jwt.sign({ user }, secret, (err, token) => {
        console.log(token);
        res.json({
          message: "Login Successfully",
          status: 200,
          success: true,
          data: { user: user, token: token },
        });
      });
    } else {
      res.json({
        message: "Error:invalid credentials , password incorrect",
        status: 401,
        data: req.body,
        success: false,
      });
    }
  }
});

// ****************** update User ************************************************** */

route.post("/update", verifyToken, async function (req, res) {
  jwt.verify(req.token, process.env.secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let id = data.user._id;
      let user = await userController.updateUser(id, req.body);
      if (user) {
        res.json({
          message: "user updated successfully",
          status: 200,
          data: user,
          success: true,
        });
      } else {
        res.json({
          message: "Error:user not found",
          status: 400,
          data: user,
          success: false,
        });
      }
    }
  });
});

//******************** delete user ***************************************** */
route.delete("/delete/:id", verifyToken, async function (req, res) {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let id = data.user._id;
      let user = await userController.deleteUser(req.params.id);
      if (user.deletedCount>0) {
        res.json({
          message: "user deleted successfully",
          status: 200,
          data: user,
          success: true,
        });
      } else {
        res.json({
          message: "Error:user not found",
          status: 400,
          data: user,
          success: false,
        });
      }
    }
  });
});

//*********************** get all user******************************************************* */
route.get("/getAll", async function (req, res) {
  const user = await userController.getAllUser();
  res.json({
    message:"all users",
    status:200,
    data:user,
    success:true

  })
})
//********************************* get user by id ******************************************** */
route.get("/getById/:id", async function (req, res) {
  let exist=await userController.check_email(req.params.id);
  if(exist){
    let data=await userController.getUserById(req.params.id);
    res.json({
      message:"user found",
      status:200,
      data:data,
      success:true
    })
  }else{
    res.json({
      message:"user not found",
      status:400,
      success:false,
    })

  }
})

//************************* get user by gmail*************************************** */
route.get("/getByEmail/:email", async function (req, res) {
  let exist=await userController.check_email(req.params.email);
  if(exist){
    let data=await userController.getUserByEmail(req.params.email);
    res.json({
      message:"user found",
      status:200,
      data:data,
      success:true
    })
  }else{
    res.json({
      message:"user not found",
      status:400,
      success:false,
    })

  }

})

module.exports=route;