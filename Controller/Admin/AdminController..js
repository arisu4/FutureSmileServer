const { BelongsTo, BelongsToMany } = require('sequelize')
const { validationResult } = require('express-validator')
const db = require('../../Model/IndexModel')
const Role = db.role
const Admin = db.admin


//const Users = require("../../Model/User")
// const sequelize= require("sequelize")


const showTypes=async(req,res)=>{
   //console.log("hello types");
   Role.findAll({raw:true})
   .then(types => {
      let type=[]
      for(let i=0;i<types.length;i++){
      type.push({id:types[i].id,adminType:types[i].adminType})
      }
      //console.log("type",type);
      res.status(200).json(type)
   })  
}


const createAdmins = async(req,res) => {
   const errors = validationResult(req)
   console.log("formdata",req.body)
   if (!errors.isEmpty() ) {
      res.status(420).json({ status: 0, errors: errors.array() })
   
   }else{
      let info = {
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         username:req.body.username,
         password:req.body.password,
         image:req.body.image,
         roles:req.body.roles,
         roleId:req.body.roleId,
         adminType:req.body.adminType,
         countryId:req.body.countryId
      }
   
      const admin = await Admin.create(info)
         .then(data => {
            if (data) {
               res.status(200).json({ status: 1, message: `Added Admin Successfully.` })
            }
         })
   }
  
     
   }



const showAdmins = async (req, res) => {
    console.log("hello role")
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const search = req.query.search
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
 
    if (!search || search == "undefined") {
       await Admin.findAll({ raw: true })
          .then(admins => {
             const paginatedAdmins= admins.slice(startIndex, endIndex)
             const totalPages = Math.ceil(admins.length / pageSize)
             res.status(200).json({ admins: paginatedAdmins, totalPages })
 
          })
    } else {
       await Admin.findAll({
          where: {
             roles: {
                [Op.like]: "%" + search + "%"
             },
          },
          raw: true
       })
          .then(admins => {
             const paginatedAdmins = admins.slice(startIndex, endIndex)
             const totalPages = Math.ceil(admins.length / pageSize)
             res.status(200).json({ admins: paginatedAdmins, totalPages })
          })
 
    }
 }

 const editAdmin = async(req,res)=>{
   console.log('this is edit function')
   const id = req.params.id
   //console.log(`editing ids`, req.params.id)
   await Admin.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(admins => {
         res.status(200).json({ editadmins: admins })
      })
 }

 const updateAdmin = async(req,res) => { 
   const id = req.body.id
   //console.log(`gallery  id`,id)
   const admins = {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      username:req.body.username,
      password:req.body.password,
      image:req.file.filename,
      roles:req.body.roles,
      roleId:req.body.roleId,
      adminType:req.body.adminType,
      countryId:req.body.countryId
   }
   await Admin.update(admins, { where: { id: id } })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Updated admin successfully' })
      })
 } 


//  const showRoles = async (req, res) => {
//    console.log("hello role")
//    const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)
//    const search = req.query.search
//    const startIndex = (page - 1) * pageSize
//    const endIndex = page * pageSize

//    if (!search || search == "undefined") {
//       await Role.findAll({include:[{
//          model:User,
//          association: new BelongsTo(Role,User),
//    }] })
//          .then(roles => {
//             const paginatedRoles= roles.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(roles.length / pageSize)
//             res.status(200).json({ roles: paginatedRoles, totalPages })

//          })
//    } else {
//       await Role.findAll({
//          where: {
//             roles: {
//                [Op.like]: "%" + search + "%"
//             },
//          },
//          raw: true
//       })
//          .then(roles => {
//             const paginatedRoles = roles.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(roles.length / pageSize)
//             res.status(200).json({ roles: paginatedRoles, totalPages })
//          })

//    }
// }






// const showRoles = async(req,res)=>{
//     await Role.findAll()
//     .then (roles=>{
//         res.status(200).json({
//           roles:roles
//         })

//     }) 
 

// }

 module.exports = {
   
    showTypes,
    createAdmins,
    showAdmins,
    editAdmin,
    updateAdmin
 }