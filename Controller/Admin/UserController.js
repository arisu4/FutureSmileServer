const { BelongsTo, BelongsToMany } = require('sequelize')
const db = require('../../Model/IndexModel')
const Role = db.role
const User = db.user


const showUsers = async (req, res) => {
    //console.log("hello role")
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const search = req.query.search
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
 
    if (!search || search == "undefined") {
       await User.findAll({include:[{
          model:Role,
          //on:
         required:true
          }]
        })
        //await User.findAll({raw:true})
          .then(users => {
             //console.log("roles",roles)
             const paginatedUsers= users.slice(startIndex, endIndex)
             const totalPages = Math.ceil(users.length / pageSize)
             res.status(200).json({ users: paginatedUsers, totalPages })
 
          })
    } else {
       await User.findAll({
          where: {
             email: {
                [Op.like]: "%" + search + "%"
             },
          },
          raw: true
       })
          .then(users => {
             const paginatedUsers = users.slice(startIndex, endIndex)
             const totalPages = Math.ceil(users.length / pageSize)
             res.status(200).json({ users: paginatedUsers, totalPages })
          })
 
     }
 }


 

 module.exports = {
    showUsers
 }