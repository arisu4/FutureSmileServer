const express = require("express")
const multer  = require('multer')
const path = require('path')
const {adminValidation} = require("../../Middleware/Validate")

const Router = express.Router()

const adminController = require("../../Controller/Admin/AdminController.")

Router.post("/admin/credential",adminController.showAdmins)
Router.get("/admin/types",adminController.showTypes)




const adminstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./../client/public/assets/imgs/admin")  
    },
    filename: function (req, file, cb) {
     
      //cb(null,file.originalname)
      //cb(null, Date.now() + path.extname(file.originalname))
      cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }})
  
  const uploadadmin = multer({
    storage:adminstorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/webp" ){
            cb(null,true)
        }else{
          
            cb(null,false);
            //  cb (new Error("Only .png ,.jpg and .jpg formats are allowed"))
            //cb ({success:false,message:"Only .png ,.jpg and .jpg formats are allowed"})
         }
   }
  })
  
Router.post("/admin/create",uploadadmin.single('image'),adminValidation,adminController.createAdmins)

Router.get("/admin/editadmin/:id",adminController.editAdmin)

const updateAdminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/admin")  
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    //cb(null, Date.now() + path.extname(file.originalname))
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
}})

const updateadmin = multer({
  storage:updateAdminStorage,
  fileFilter:(req,file,cb)=>{
      if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/webp" ){
          cb(null,true)
      }else{
        
          cb(null,false);
          //  cb (new Error("Only .png ,.jpg and .jpg formats are allowed"))
          //cb ({success:false,message:"Only .png ,.jpg and .jpg formats are allowed"})
       }
 }
})

Router.post("/admin/gallery/updategallery",updateadmin.single('image'),adminController.updateAdmin)


module.exports = Router
