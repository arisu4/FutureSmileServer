const express = require("express")

const Router = express.Router()

//const{queryValidation} = require("../../Middleware/Validate")
const adminAuth  =  require("../../Middleware/adminAuth").authjwt



const loginController = require("../../Controller/Admin/LoginController")

//Admin Signup
Router.post("/admin/register",loginController.register)

//Admin Login
Router.post("/admin/login",loginController.adminLogin)

//Admin Logout  
//Router.get("/admin/logout",loginController.adminLogout)

Router.use(adminAuth)

Router.post('/admin/verifytoken',loginController.verifyToken)

module.exports = Router

