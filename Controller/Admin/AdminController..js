const { BelongsTo, BelongsToMany } = require('sequelize')
const db = require('../../Model/IndexModel')
const Role = db.role
const Admin = db.admin


//const Users = require("../../Model/User")
// const sequelize= require("sequelize")


const showTypes=async(req,res)=>{
   console.log("hello types");
   Role.findAll({raw:true})
   .then(types => {
      let type=[]
      for(let i=0;i<types.length;i++){
      type.push({id:types[i].id,adminType:types[i].adminType})
      }
      console.log("type",type);
      res.status(200).json(type)
   })  
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
    showAdmins,
    showTypes
 }