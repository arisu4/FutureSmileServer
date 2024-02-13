const { Sequelize } = require(`sequelize`)
const db = require('../../Model/IndexModel')
//const SubModule = require('../../Model/SubModule')
const Module = db.module
const Submodule = db.submodule
const Permission = db.rolepermission
const Role = db.role
const { Op } = require('sequelize')


const showModules = async (req, res) => {
   await Module.findAll({
      order: [['orders', 'DESC']],
      raw: true,
   })
      .then(modules => {
         //  console.log('modules',modules)
         res.status(200).json(modules)
      })
}

// original 1
// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       raw: true
//    })
//       .then(submodules => {
//          res.status(200).json(submodules)
//       })
// }


// original 2
// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       raw: true
//    })
//       .then(submodules => {
//          res.status(200).json(submodules)
//       })
// }

// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       include:{model:Module,attributes:['id'],include:{model:Permission,attributes:['module_access','sub_module_access']}},
//       raw: true
//       })
//       .then(submodules => {
//           console.log("submodule",submodules);
//          //res.status(200).json(submodules)
//       })
// }


//Usable code 1
// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       include: [{
//          model: Module, attribute: ['id'],
//          as:"module"
//      }],

//       raw: true
//       })
//       .then(submodules => {
//           console.log("submodule",submodules);
//          res.status(200).json(submodules)
//       })
// }


//Usable code 2
// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       attributes:{exclude:['createdAt','updatedAt']}, 
//       include: [{
//          model: Module,
//          as:"module",
//          on: {
//             moduleId: Sequelize.where(Sequelize.col("moduleId"), "=", Sequelize.col("module.id")),
//          },
//          attributes: [] 
//      }],
//      include:[{
//       model:Permission,
//       as:"submodulepermission",
//       attributes:['subModuleId','module_access','sub_module_access'],

//      }],

//       raw: true
//       })
//       .then(submodules => {
//           console.log("submodule",submodules);
//          res.status(200).json(submodules)
//       })
// }


// const showSubmodules = async (req, res) => {
//    console.log('role Id', req.params.roleId);
//    console.log('module Id', req.params.id);
//    let roleId = req.params.roleId
//    let moduleId = req.params.id
//    await Permission.findAll({
//       where: { roleId: roleId },
//       attributes: { exclude: ['access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] },
//       include: [{
//          model: Submodule,
//          attributes: ['sub_module_name', 'link'],
//          where: { moduleId: moduleId },
//          as: "submodulepermit",
//          //   include:[{
//          //    model:Permission,
//          //    attributes:['roleId','subModuleId','module_access','sub_module_access',],
//          //    as:"submodulepermission"
//          //   }], 
//       }],
//       raw: true,
//       nest: true
//    })
//       .then(submodules => {
//          // let module_access  = submodules.sub_module_access


//          console.log("submodule access", submodules);
//          //submodules.setDataValue("sub_module_name",sub_module_name)
//          res.status(200).json(submodules)
//       })
// }


const showSubmodules = async (req, res) => {
   // console.log('role Id', req.params.roleId);
   // console.log('module Id', req.params.id);
   let roleId = req.params.roleId
   let moduleId = req.params.id
   await Permission.findAll({
      where: { roleId: roleId,
      sub_module_access:1 },
      attributes: { exclude: ['access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] },
      include: [{
         model: Submodule,
         attributes: ['sub_module_name', 'link'],
         where: { moduleId: moduleId },
         as: "submodulepermit",
         //   include:[{
         //    model:Permission,
         //    attributes:['roleId','subModuleId','module_access','sub_module_access',],
         //    as:"submodulepermission"
         //   }], 
      }],
      raw: true,
      nest: true
   })
      .then(submodules => {
         // let module_access  = submodules.sub_module_access


   //console.log("submodule access", submodules);
         //submodules.setDataValue("sub_module_name",sub_module_name)
         res.status(200).json(submodules)
      })
}









// const showanother = async (req, res) => {

//    try {
//       Permission.findAll({
//          where: {
//             roleId: req.params.roleId,
//             module_access: 1,
//             sub_module_access: 1
//          },
//          attributes: { exclude: ['access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] },
//          include: [
//             {
//                model: Submodule,
//                attributes: { exclude: [ 'createdAt', 'updatedAt'] },
//                include: [
//                   {
//                      model: Module,
//                      attributes: { exclude: ['icon','orders', 'createdAt', 'updatedAt'] },
//                      as: 'module'
//                   }
//                ],
//                as: 'submodulepermit'
//             }
//          ],

//       }).then((data) => {
//          res.status(200).json({
//             message: 'mysql query result',
//             QueryData: data
//          }).catch((err) => {
//             res.status(402).json({ message: 'inside query', Error: err })
//          })
//       })



//       // Process the result
//       // console.log(result);

//    } catch (error) {
//       res.status(400).json({ QueryError: error })
//       console.error('Error executing Sequelize query:', error.message);
//    }

// }



// Most Original
// const accessSubmodules = async (req, res) => {
//    console.log('role Id', req.query.role);
//    console.log('path', req.query.path);

//    const roleId = req.query.role;
//    const  link = req.query.path

//    if(link !== "/error" && roleId === undefined){
     
//    await Submodule.findOne({
//       where: { link: link },
//       attributes: { exclude: ['sub_module_name', 'createdAt', 'updatedAt'] },
//       raw: true
//    })
//    .then(submoduleId => {
//       // let module_access  = submodules.sub_module_access
//       console.log("subModuleId",submoduleId.id);
//          const subModuleId = submoduleId.id
         
//           Permission.findOne({
//             where: {
//                [Op.and]: [
//                  { roleId: roleId },
//                  { subModuleId:subModuleId  }
//                ]
//              },
//              attributes: { exclude: ['id','moduleId','module_access','access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] }, 
//              raw:true
//          })
//          .then(access=>{
//             console.log("access permit",access.sub_module_access);
//             let permit = access.sub_module_access
//             res.status(200).json(permit)
//          })
// //console.log("submodule access", submodules);
//       //submodules.setDataValue("sub_module_name",sub_module_name)
//       //res.status(200).json(submodules)
       
//    })
// }else {
//    console.log("return statement");
// }

  
   

//    // let roleId = req.params.roleId
//    // let moduleId = req.params.id
//    // await Permission.findAll({
//    //    where: { roleId: roleId,
//    //    sub_module_access:1 },
//    //    attributes: { exclude: ['access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] },
//    //    include: [{
//    //       model: Submodule,
//    //       attributes: ['sub_module_name', 'link'],
//    //       where: { moduleId: moduleId },
//    //       as: "submodulepermit",
//    //       //   include:[{
//    //       //    model:Permission,
//    //       //    attributes:['roleId','subModuleId','module_access','sub_module_access',],
//    //       //    as:"submodulepermission"
//    //       //   }], 
//    //    }],
//    //    raw: true,
//    //    nest: true
//    // })
//    //    .then(submodules => {
//    //       // let module_access  = submodules.sub_module_access


//    // //console.log("submodule access", submodules);
//    //       //submodules.setDataValue("sub_module_name",sub_module_name)
//    //       res.status(200).json(submodules)
//    //    })
// }





// const accessSubmodules = async (req, res) => {
//    console.log('role Id', req.query.role);
//    console.log('path', req.query.path);

//    const roleId = req.query.role;
//    const  link = req.query.path

//    if(link !== "/error" && roleId !== undefined){
     
//    await Submodule.findOne({
//       where: { link: link },
//       attributes: { exclude: ['sub_module_name', 'createdAt', 'updatedAt'] },
//       raw: true
//    })
//    .then(submodule => {

//       // let module_access  = submodules.sub_module_access
//       //console.log("ids",submodule);
//       console.log("subModuleId",submodule.id);
//          const subModuleId = submodule.id
//           Permission.findOne({
//             where: {
//                [Op.and]: [
//                  { roleId: roleId },
//                  { subModuleId:subModuleId  }
//                ]
//              },
//              attributes: { exclude: ['id','moduleId','module_access','access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] }, 
//              raw:true
//          })
//          .then(access=>{
//             console.log("access permit",access.sub_module_access);
//             let permit = access.sub_module_access
//             res.status(200).json(permit)
//          })
     
//    }
//    )
// }else {
//   console.log("bad permission");
// }


// }



// const accessSubmodules = async (req, res) => {
//       console.log('role Id', req.query.role);
//       console.log('path', req.query.path);
   
//       const roleId = req.query.role;
//       const  link = req.query.path
   
//       if(link !== "/error" && roleId !== undefined){
        
//       await Submodule.findOne({
//          where: { link: link },
//          attributes: { exclude: ['sub_module_name', 'createdAt', 'updatedAt'] },
//          raw: true
//       })
//       .then(submodule => {
   
//          // let module_access  = submodules.sub_module_access
//          //console.log("ids",submodule);
//          console.log("subModuleId",submodule.id);
//             const subModuleId = submodule.id
//              Permission.findOne({
//                where: {
//                   [Op.and]: [
//                     { roleId: roleId },
//                     { subModuleId:subModuleId  }
//                   ]
//                 },
//                 attributes: { exclude: ['id','moduleId','module_access','access_item', 'details_item', 'add_item', 'edit_item', 'delete_item', 'status_item', 'createdAt', 'updatedAt'] }, 
//                 raw:true
//             })
//             .then(access=>{
//                console.log("access permit",access.sub_module_access);
//                let permit = access.sub_module_access
//                res.status(200).json(permit)
//             })
        
//       }
//       )
//    }else {
//      console.log("bad permission");
//    }
   
   
//    }
   



module.exports = {
   showModules,
   showSubmodules, 
   //accessSubmodules
   // showanother
}