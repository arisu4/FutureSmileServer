const express = require("express")

const Router = express.Router()

const permissionController = require("../../Controller/Admin/PermissionController")

Router.get("/admin/permission",permissionController.showPermission)

Router.post("/admin/updatepermission",permissionController.updatePermission)

module.exports = Router

