module.exports = (sequelize,DataTypes) =>{
    const submodule = sequelize.define(`sub_modules`,{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          
        },
        moduleId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        link:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sub_module_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE
    })

    return submodule
}