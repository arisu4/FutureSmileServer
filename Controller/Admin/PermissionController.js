const db = require('../../Model/IndexModel')
const RolePermission = db.rolepermission
const { Op } = require('sequelize')

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




const updatePermission = async(req,res)=>{
   //console.log("permission body",req.body);
const permissionbody = req.body
console.log("permission",permissionbody)

 const permissionids = permissionbody.map((permission) =>permission.id);
 console.log("permissionid",permissionids)

 for(let i=0;i<permissionids.length;i++){
   const permissions = {
         id :permissionids[i]
       }
       
 console.log("get permissions",permissions.id)  
      }




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