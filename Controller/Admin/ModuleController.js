const db = require('../../Model/IndexModel')
const SubModule = require('../../Model/SubModule')
const Module = db.module
const Submodule = db.submodule
const Permission = db.rolepermission
const Role = db.role



const showModules = async (req, res) => {
   await Module.findAll({
      order:[['orders','ASC']], 
      raw: true,
   })
      .then(modules => {
         //  console.log('modules',modules)
         res.status(200).json(modules)
      })
}

// original
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


//Usable code
const showSubmodules = async (req, res) => {
   let id = req.params.id
   await Submodule.findAll({
      where: { moduleId: id },
      include: [{
         model: Module, attribute: ['id'],
         as:"submodule"
     }],
    
      raw: true
      })
      .then(submodules => {
          //console.log("submodule",submodules);
         res.status(200).json(submodules)
      })
}





module.exports = {
   showModules,
   showSubmodules
}