const { Sequelize} = require(`sequelize`)
const db = require('../../Model/IndexModel')
const SubModule = require('../../Model/SubModule')
const Module = db.module
const Submodule = db.submodule
const Permission = db.rolepermission
const Role = db.role



const showModules = async (req, res) => {
   await Module.findAll({
      order:[['orders','DESC']], 
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
const showSubmodules = async (req, res) => {
   let id = req.params.id
   await Submodule.findAll({
      where: { moduleId: id },
      attributes:{exclude:['createdAt','updatedAt']}, 
      include: [{
         model: Module,
         as:"module",
         on: {
            moduleId: Sequelize.where(Sequelize.col("moduleId"), "=", Sequelize.col("module.id")),
         },
         attributes: [] 
     }],
   //   include:[{
   //    model:Permission,
   //    as:"module",
   //    on: {
   //       moduleId: Sequelize.where(Sequelize.col("moduleId"), "=", Sequelize.col("module.id")),
   //    },
   //    attributes: [] 
   //   }],
    
      raw: true
      })
      .then(submodules => {
          console.log("submodule",submodules);
         res.status(200).json(submodules)
      })
}



// const showSubmodules = async (req, res) => {
//    let id = req.params.id
//    await Submodule.findAll({
//       where: { moduleId: id },
//       attributes:{exclude:['createdAt','updatedAt']},
//       // include: [{
//       //    model: Module, attributes: ['id'],
//       //    as:"module",
//         include:[{
//          model:Permission,
//          attributes:['subModuleId','module_access','sub_module_access'],
//          as:"submodulepermission"
//         }], 
//    //   }],
//       raw: true
//       })
//       .then(submodules => {
//          // let module_access  = submodules.sub_module_access
//           console.log("access")
//          console.log("submodule",submodules);
//          res.status(200).json(submodules)
//       })
// }





module.exports = {
   showModules,
   showSubmodules
}