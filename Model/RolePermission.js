module.exports = (sequelize,DataTypes) =>{
    const rolepermission = sequelize.define(`role_permissions`,{
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        module_id:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        sub_module_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        module_access:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        sub_module_access:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        access_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        details_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        add_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        edit_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
       
        delete_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        status_item:{
            type:DataTypes.INTEGER,
            allowNull:false   
        },
        
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE
    })

    return rolepermission
}