const jwt = require('jsonwebtoken')

exports.authjwt = (req,res,next)=>{
    if(req.cookies&&req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,'auth',(err,data)=>{
            req.admin=data
            next()
        })
    }else{
        next()
    }
}

