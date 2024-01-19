const db = require('../Model/IndexModel')

module.exports = (sequelize,DataTypes) =>{
   
    const user = sequelize.define(`users`,{
        id:{
            type:DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        roles:{
            type:DataTypes.ENUM,
            values:['admin','subadmin','user'],
            defaultValue: "user",
            allowNull:false
        },
        roleId:{
            type:DataTypes.INTEGER,
            //references:{model:db.user,key:"id"},
            allowNull:false,   
        },
        // role:{
        //     type:DataTypes.STRING,
        //     defaultValue: "0",
        //     allowNull:false
        // },
        status:{
            type:DataTypes.STRING,
            defaultValue: "1",
            allowNull:false
           
        },
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE,
        //tableName: 'users'
    });

    return user
}

