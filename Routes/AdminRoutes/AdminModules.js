const express = require("express")

const Router = express.Router()

const moduleController = require("../../Controller/Admin/ModuleController")

Router.get("/admin/module",moduleController.showModules)
Router.get("/admin/submodules/:id/:roleId",moduleController.showSubmodules)

//access permit
Router.get("/admin/access",moduleController.accessSubmodules)



//Router.get("/agency/:roleId",moduleController.showanother)

module.exports = Router

