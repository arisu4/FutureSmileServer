const db = require('../../Model/IndexModel')
const user = require('../../Model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//const { Op } = require('sequelize')


const User = db.user


//Query add
// const createFaq = async (req, res) => {
//    const errors = validationResult(req)
//    console.log(errors)
//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//          questions: req.body.questions,
//          solutions: req.body.solutions,
//       }
//       console.log(info)
//       const queries = await Query.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Faq Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }


const register = async (req, res) => {
   console.log('email', req.body.email)
   console.log('password', req.body.password)
   //const email = req.body.email
   //const password = req.body.password

   const info = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),

   };
   await User.create(info)
      .then(users => {
         if (users) {
            res.status(200).json({ status: 1, message: `Added Information  Successfully.` })
         }
      })
}

// if (existingUser) {

//    return res.status(400).json('User already exists');

//  }else{
//    const hashedPassword = await bcrypt.hash(req.body.password, 10);
//    let info = {
//       email: req.body.email,
//       password: hashedPassword,
//    }
//    console.log(info)
//    const users =  await User.create(info)
//       .then(users=> {
//          if (users) {
//             res.status(200).json({ status: 1, message: `Added User Successfully` })
//          }
//       })
//  }




// const Login =(req,res)=>{
//  console.log('email     ',req.body)
//  console.log('password  ',req.body.password)
//  loginData = {}
//    loginData.email =(req.cookies.email)?req.cookies.email:undefined
//    loginData.password =(req.cookies.password)?req.cookies.password:undefined

//  res.render('login',{
//    data:loginData
//  })

const adminLogin = async (req, res) => {
    await User.findOne({
      where: {
         email: req.body.email
      },
      raw: true
   })
    .then(data=>{
      if(data && data.role=="1"){
         const hashedPassword = data.password
         if(bcrypt.compareSync(req.body.password,hashedPassword)){
            const token = jwt.sign({
               id:data.id,
               email:data.email
            },'auth',{expiresIn:'5m'})
            res.cookie('adminToken',token)
         
            //console.log('token---------',token)

            const cookie = req.cookies
            console.log('cookie',cookie);

            console.log(data,"login successfully")
            res.status(200).json({status: 1,message:"Logged successfully"})

         } else if(data && data.role=="1") {
            res.status(400).json({status:1,message:"Bad Credentials"})
            console.log('password problem')
       }
       } else if(data && data.role=="0"){
         res.status(420).json({status:1,message:"Not an admin"})

       }
    })

   // console.log('datas', datas)
   // if (datas && datas.role == "1") {
   //    const hashedPassword = datas.password
   //    if (bcrypt.compareSync(req.body.password, hashedPassword)) {
   //       const token = jwt.sign({
   //          id: datas.id,
   //          email: datas.email
   //       }, 'auth', { expiresIn: '5m' })
   //       res.cookie('adminToken', token)

   //       const cookie = req.cookies
   //       console.log('cookie---',cookie)

   //       console.log('token---------',token)


   //       console.log(datas,"login successfully")
   //       res.status(200).json({ status: 1, message: "Logged successfully" })

   //    }
   // }
}


const adminAuth = (req, res, next) => {
   if (req.admin) {
      console.log('verified admin', req.admin)
   } else {
      res.status(404).json({ message: "login first" })
      res.redirect("/")
   }
}





const adminLogout = (res) => {
   cookies.remove('token');
   localStorage.clear();
   res.render('/')
   res.status(200).json({ message: "Logged out" })

}




module.exports = {
   register,
   adminLogin,
   adminLogout,
   adminAuth
}