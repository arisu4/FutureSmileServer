const express = require("express")

const Router = express.Router()

const roleController = require("../../Controller/Admin/RoleController")

Router.post("/admin/roles",roleController.showRoles)

module.exports = Router

