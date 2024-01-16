module.exports = (sequelize,DataTypes) =>{
    const role = sequelize.define(`roles`,{
     
        role:{
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
      user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,   
      },
        
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE
    })

    return role
}