const express = require("express")

const Router = express.Router()

const moduleController = require("../../Controller/Admin/ModuleController")

Router.get("/admin/module",moduleController.showModules)
Router.get("/admin/submodules/:id",moduleController.showSubmodules)

module.exports = Router

