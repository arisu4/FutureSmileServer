const db = require('../Model/IndexModel')

module.exports = (sequelize,DataTypes) =>{
   
    const admin = sequelize.define(`admins`,{
        id:{
            type:DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        username:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        password:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        profilePic:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        roles:{
            type:DataTypes.ENUM,
            values:['admin','subadmin','user'],
            // defaultValue: "user",
            allowNull:false
        },
        roleId:{
            type:DataTypes.INTEGER,
            //references:{model:db.user,key:"id"},
            allowNull:false,   
        },
        adminType:{
            type:DataTypes.ENUM,
            values:['SUPER_ADMIN','SUB_ADMIN','AGENCY_ADMIN'],
            allowNull:false   
        },
        countryId:{
            type:DataTypes.INTEGER,
            //references:{model:db.user,key:"id"},
            allowNull:false, 
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: "1",
            allowNull:false
           
        },
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE,
        //tableName: 'users'
    });

    return admin
}
