module.exports = (sequelize,DataTypes) =>{
    const module = sequelize.define(`modules`,{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          
            autoIncrement: true,
          
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        icon:{
            type:DataTypes.STRING,
            allowNull:false
        },
        orders:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE
    })

    return module
}