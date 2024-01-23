const db = require('../../Model/IndexModel')
const SubModule = require('../../Model/SubModule')
const Module = db.module
const Submodule = db.submodule



const showModules = async (req, res) => {
   await Module.findAll({
      raw: true,
      //order:['orders',DESC] 
   })
      .then(modules => {
         //  console.log('modules',modules)
         res.status(200).json(modules)
      })
}


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

const showSubmodules = async (req, res) => {
   let id = req.params.id
   await Submodule.findAll({
      where: { moduleId: id },
      raw: true
   })
      .then(submodules => {
         res.status(200).json(submodules)
      })
}




module.exports = {
   showModules,
   showSubmodules
}