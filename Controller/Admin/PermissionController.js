const { Sequelize} = require(`sequelize`)
const db = require('../../Model/IndexModel')
const RolePermission = db.rolepermission
const { Op } = require('sequelize')
const Role = db.role
const Module = db.module
const Submodule = db.submodule


// Original code 1
// const showPermission = async (req, res) => {
//     console.log("hello module")
//     const page = parseInt(req.query.page)
//     const pageSize = parseInt(req.query.pageSize)
//     const search = req.query.search
//     const startIndex = (page - 1) * pageSize
//     const endIndex = page * pageSize
//     if (!search || search == "undefined") {
//        await RolePermission.findAll({ raw: true })
//           .then(permissions => {
//              const paginatedPermissions= permissions.slice(startIndex, endIndex)
//              const totalPages = Math.ceil(permissions.length / pageSize)
//              res.status(200).json({ permissions: paginatedPermissions, totalPages })
//           })
//     } else {
//        await RolePermission.findAll({
//           where: {
//              module_id: {
//                 [Op.like]: "%" + search + "%"
//              },
//           },
//           raw: true
//        })
//           .then(permissions => {
//              const paginatedPermissions = permissions.slice(startIndex, endIndex)
//              const totalPages = Math.ceil(permissions.length / pageSize)
//              res.status(200).json({ permissions: paginatedPermissions, totalPages })
//           })
//     }
//  }


// Original code 2
const showPermission = async (req, res) => {
    console.log("hello module")
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const search = req.query.search
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    if (!search || search == "undefined") {
       await RolePermission.findAll({ raw: true })
          .then(permissions => {
             const paginatedPermissions= permissions.slice(startIndex, endIndex)
             const totalPages = Math.ceil(permissions.length / pageSize)
             res.status(200).json({ permissions: paginatedPermissions, totalPages })
          })
    } else {
       await RolePermission.findAll({
          where: {
             module_id: {
                [Op.like]: "%" + search + "%"
             },
          },
          raw: true
       })
          .then(permissions => {
             const paginatedPermissions = permissions.slice(startIndex, endIndex)
             const totalPages = Math.ceil(permissions.length / pageSize)
             res.status(200).json({ permissions: paginatedPermissions, totalPages })
          })
    }
 }


//  Original  addition of modules 1
//  const showPermission = async (req, res) => {
//    console.log("hello module")
//    const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)
//    const search = req.query.search
//    const startIndex = (page - 1) * pageSize
//    const endIndex = page * pageSize
//    if (!search || search == "undefined") {
//       await RolePermission.findAll({
//          include:[{
//             model:Role,attribute:['id'],
//             as:"rolepermission",
//             include:[{
//                model:Module,attribute:['id'],
//                as:"modulepermission",
//                include:[{
//                   model:Submodule,attribute:['id'],
//                   as:"module"
//                }]
//             }],
//           }],
//           raw: true })
//          .then(permissions => {
//             console.log("permissions",permissions);
//             const paginatedPermissions= permissions.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(permissions.length / pageSize)
//             res.status(200).json({ permissions: paginatedPermissions, totalPages })
//          })
//    } else {
//       await RolePermission.findAll({
//          where: {
//             module_id: {
//                [Op.like]: "%" + search + "%"
//             },
//          },
//          raw: true
//       })
//          .then(permissions => {
//             const paginatedPermissions = permissions.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(permissions.length / pageSize)
//             res.status(200).json({ permissions: paginatedPermissions, totalPages })
//          })
//    }
// }

 //Original  addition of modules 2
//  const showPermission = async (req, res) => {
//    console.log("hello module")
//    const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)
//    const search = req.query.search
//    const startIndex = (page - 1) * pageSize
//    const endIndex = page * pageSize
//    if (!search || search == "undefined") {
//       await RolePermission.findAll({
//          include:[{
//             model:Role,
//             as:"rolepermission",
//             on: {
//                roleId: Sequelize.where(Sequelize.col("roleId"), "=", Sequelize.col("role.id")),
//             },
//             attributes: [],
//          }],
//          include:[{
//                model:Module,
//                as:"modulepermit",
//                on: {
//                   moduleId: Sequelize.where(Sequelize.col("moduleId"), "=", Sequelize.col("module.id")),
//                },
//                attributes: [], 
              
//             }],
//          include:[{
//                   model:Submodule,
//                   as:"submodulepermit",
//                   on: {
//                      subModuleId: Sequelize.where(Sequelize.col("Submodule.subModuleId"), "=", Sequelize.col("submodule.id")),
//                   },
//                   attributes: [], 
//                }],
//           raw: true })
          
//          .then(permissions => {
//             console.log("permissions",permissions);
//             const paginatedPermissions= permissions.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(permissions.length / pageSize)
//             res.status(200).json({ permissions: paginatedPermissions, totalPages })
//          })
//    } else {
//       await RolePermission.findAll({
//          where: {
//             module_id: {
//                [Op.like]: "%" + search + "%"
//             },
//          },
//          raw: true
//       })
//          .then(permissions => {
//             const paginatedPermissions = permissions.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(permissions.length / pageSize)
//             res.status(200).json({ permissions: paginatedPermissions, totalPages })
//          })
//    }
// }






// var result = await models.student.update(student[i],{where :{id: student[i].id}});


const updatePermission = async(req,res)=>{

//console.log("permission body",req.body);
// const permissionbody = req.body
// console.log("permission",permissionbody)

const body = req.body.map(permissions=>permissions)
console.log("body",body)

for(let i = 0;i<body.length;i++){
   // console.log("loop id",body[i].id)
   // console.log("role_id",body[i].role_id)
   // console.log("module_id",body[i].module_id)
   // console.log("sub_module_id",body[i].sub_module_id)
   // console.log("module_access",body[i].module_access)
   // console.log("sub_module_access",body[i].sub_module_access)

   const permissions = {
      id:body[i].id,
      roleId:body[i].roleId,
      moduleId:body[i].moduleId,
      subModuleId:body[i].subModuleId,
      module_access:body[i].module_access,
      sub_module_access:body[i].sub_module_access,
      access_item:body[i].access_item,
      add_item:body[i].add_item,
      edit_item:body[i].edit_item,
      details_item:body[i].details_item,
      delete_item:body[i].delete_item,
      status_item:body[i].status_item
   }
    
   await RolePermission.update(permissions, { where: { id: body[i].id} })
   .then(() => {
     console.log("Updated permissions successfully.");
   })
   

}




//  const id = req.body.map((permission)=>permission.id);
//  console.log("permissionid",id)

//  await RolePermission.update(req.body,{where:{id:id}})
//   .then(()=>{
//        res.status(200).json({ status: 1, message: 'Updated permissions successfully' })
//       })



//  for(let i=0;i<permissionids.length;i++){
  
//    let permissions = {
//          id :permissionids[i],
//          role_id:req.body.role_id,
//          module_id:req.body.module_id,
//          sub_module_id:req.body.sub_module_id,
//          module_access:req.body.module_access,
//          sub_module_access:req.body.sub_module_access,
//          access_item:req.body.access_item,
//          details_item:req.body.details_item,
//          add_item:req.body.add_item,
//          edit_item:req.body.edit_item,
//          delete_item:req.body.delete_item,
//          status_item:req.body.status_item
//        }
//        let result = await RolePermission.update(permissions[i],{
//                where:{id:permissions.id}
//        })
//               console.log(permissions.id )
//       }
   
     
      // await  RolePermission.update(req.body,{
      //    where:{id:permission.}
      // })
      // .then(()=>{
      //  res.status(200).json({ status: 1, message: 'Updated permissions successfully' })
      // })




//    console.log('body',req.body);
   
//   const permissions = {
//     id :req.body.obj.id,
//   role_id : req.body.obj.role_id,
//   module_id :req.body.obj.module_id ,
//   sub_module_id :req.body.obj.sub_module_id,
//   module_access:req.body.module_access,
//   sub_module_access:req.body.sub_module_access,
//   access_item:req.body.access_item,
//   add_item:req.body.add_item,
//   edit_item:req.body.edit_item,
//   details_item:req.body.details_item,
//   delete_item:req.body.delete_item,
//   status_item:req.body.status_item
//   }
  
//    await  RolePermission.update(permissions,{
//      where:{id:req.body.obj.id}
//   })
//   .then(()=>{
//    res.status(200).json({ status: 1, message: 'Updated permissions successfully' })
//   })
  

// let permissionsexists = await RolePermission findOne

//  await RolePermission.update({
//    where:{id:id}
//  })
 
   }



 module.exports = {
    showPermission,
    updatePermission
 }