const db = require('../Model/IndexModel')

module.exports = (sequelize,DataTypes) =>{

    const role = sequelize.define(`roles`,{
        id:{
            type:DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        roles:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role_description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        adminType:{
            type:DataTypes.ENUM,
            values:['SUPER_ADMIN','SUB_ADMIN','AGENCY_ADMIN'],
            allowNull:false   
        },
   
        
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE,
        //tableName: 'roles'
    });

    return role
}