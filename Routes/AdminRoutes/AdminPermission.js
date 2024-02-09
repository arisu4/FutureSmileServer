const express = require("express")

const Router = express.Router()

const permissionController = require("../../Controller/Admin/PermissionController")

Router.get("/admin/permission",permissionController.showPermission)

Router.post("/admin/updatepermission",permissionController.updatePermission)

Router.get("/admin/permitprovider/:roleId/:moduleId",permissionController.permitProvider)

module.exports = Router

