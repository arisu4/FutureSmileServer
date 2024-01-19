const express = require("express")

const Router = express.Router()

const adminController = require("../../Controller/Admin/AdminController.")

Router.post("/admin/credential",adminController.showAdmins)
Router.get("/admin/types",adminController.showTypes)

module.exports = Router
