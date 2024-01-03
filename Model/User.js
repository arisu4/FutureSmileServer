module.exports = (sequelize,DataTypes) =>{
    const user = sequelize.define(`users`,{
        // id:{
        //     type:DataTypes.STRING,
        //     allowNull:false
        // },
       
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },

        role:{
            type:DataTypes.STRING,
            defaultValue: "0",
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: "1",
            allowNull:false
           
        },
        
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE
    })

    return user
}