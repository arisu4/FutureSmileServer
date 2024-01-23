const dbConfig = require(`../Config/dbConfig`)

const { Sequelize, DataTypes } = require(`sequelize`)
const Roles = require("../Model/Role")
const Users = require("../Model/User")


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,

        }
    }
)



sequelize.authenticate()
    .then(() => {
        console.log(`database connected`)
    })
    .catch(error => {
        console.log(`error occured during connection`, +error)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.contact_enquiry = require(`./ContactEnquiry`)(sequelize, DataTypes)
db.testimonial=require('./Testimonial')(sequelize, DataTypes)
db.team_member=require('./TeamMember')(sequelize, DataTypes)
db.brand = require('./Brand')(sequelize, DataTypes)
db.service = require('./Service')(sequelize, DataTypes)
db.contact = require('./Contact')(sequelize, DataTypes)
db.gallery = require('./Gallery')(sequelize, DataTypes)
db.query = require('./Query')(sequelize, DataTypes)
db.video = require('./Video')(sequelize, DataTypes)
db.story = require('./Story')(sequelize, DataTypes)
db.admin = require('./Admin')(sequelize,DataTypes)
db.user = require('./User')(sequelize,DataTypes)
db.role = require('./Role')(sequelize,DataTypes)
db.module = require('./Module')(sequelize,DataTypes)
db.rolepermission = require('./RolePermission')(sequelize,DataTypes)
db.submodule= require('./SubModule')(sequelize,DataTypes)

// db.role.belongsToMany(db.user, { through: 'user_id' })
// db.user.belongsTo(db.role, { through: 'role_id' })

// db.role.hasMany(db.user)
// db.user.belongsTo(db.role)

// Roles.hasMany(Users,{as : 'connect', foreignKey : 'role_id' ,constraints: true, onDelete: 'cascade' ,sourcekey:'id'})
// Users.belongsTo(Roles,{ foreignKey : 'role_id',constraints: true, onDelete: 'cascade',sourceKey:'id'})

// Roles.hasMany(Users)
// Users.belongsTo(Roles)
db.role.hasMany(db.user, { constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE"})
//db.user.belongsTo(db.role, { constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
// Roles.hasMany(Users)
db.admin.belongsTo(db.role, { constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.module.hasMany(db.submodule,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.submodule.belongsTo(db.module,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.role.hasMany(db.rolepermission,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.rolepermission.belongsTo(db.role,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.module.hasMany(db.rolepermission,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.rolepermission.belongsTo(db.module,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.submodule.hasMany(db.rolepermission,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
db.rolepermission.belongsTo(db.submodule,{ constraints: true, onUpdate: "CASCADE", onDelete:"CASCADE" })
// db.user.sync({ force: false})
// .then(() => {
//   db.role.sync({ force: false}).then(() => {
//     console.log("sync of role and user done");
//   })
// })

db.sequelize.sync({ force: false })
    .then(() => {
        console.log(`yes resync of database done`)
    })

module.exports = db