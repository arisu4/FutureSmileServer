const express = require("express")

const Router = express.Router()

//const{queryValidation} = require("../../Middleware/Validate")




const loginController = require("../../Controller/Admin/LoginController")

//Admin Signup
Router.post("/admin/register",loginController.register)

//Admin Login
Router.post("/admin/login",loginController.adminLogin)

//Admin Logout
Router.get("/admin/logout",loginController.adminLogout)



module.exports = Router

