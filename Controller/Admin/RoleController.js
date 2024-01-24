const { BelongsTo, BelongsToMany } = require('sequelize')
const db = require('../../Model/IndexModel')
const Role = db.role
// const User = db.user

//const Users = require("../../Model/User")
// const sequelize= require("sequelize")

// const showRoles = async (req, res) => {
//     console.log("hello role")
//     const page = parseInt(req.query.page)
//     const pageSize = parseInt(req.query.pageSize)
//     const search = req.query.search
//     const startIndex = (page - 1) * pageSize
//     const endIndex = page * pageSize
 
//     if (!search || search == "undefined") {
//        await Role.findAll({ raw: true })
//           .then(roles => {
//              const paginatedRoles= roles.slice(startIndex, endIndex)
//              const totalPages = Math.ceil(roles.length / pageSize)
//              res.status(200).json({ roles: paginatedRoles, totalPages })
 
//           })
//     } else {
//        await Role.findAll({
//           where: {
//              roles: {
//                 [Op.like]: "%" + search + "%"
//              },
//           },
//           raw: true
//        })
//           .then(roles => {
//              const paginatedRoles = roles.slice(startIndex, endIndex)
//              const totalPages = Math.ceil(roles.length / pageSize)
//              res.status(200).json({ roles: paginatedRoles, totalPages })
//           })
 
//     }
//  }

 const showRoles = async (req, res) => {
   console.log("hello role")
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await Role.findAll({ raw: true })
         .then(roles => {
            const paginatedRoles= roles.slice(startIndex, endIndex)
            const totalPages = Math.ceil(roles.length / pageSize)
            res.status(200).json({ roles: paginatedRoles, totalPages })

         })
   } else {
      await Role.findAll({
         where: {
            roles: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(roles => {
            const paginatedRoles = roles.slice(startIndex, endIndex)
            const totalPages = Math.ceil(roles.length / pageSize)
            res.status(200).json({ roles: paginatedRoles, totalPages })
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
    showRoles
 }