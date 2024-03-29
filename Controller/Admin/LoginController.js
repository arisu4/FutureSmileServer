const db = require('../../Model/IndexModel')
// const user = require('../../Model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
//const { Op } = require('sequelize')
const nodemailer = require('nodemailer'); 
const {OtpGenerator} = require('./OtpGenerator');

const User = db.user
const Admin = db.admin
const Role = db.role

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

//original registration
// const register = async (req, res) => {
//    console.log('email', req.body.email)
//    console.log('password', req.body.password)
//    //const email = req.body.email
//    //const password = req.body.password

//    const info = {
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),

//    };
//    await User.create(info)
//       .then(users => {
//          if (users) {
//             res.status(200).json({ status: 1, message: `Added Information  Successfully.` })
//          }
//       })
// }





const register = async(req, res) => {
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
            const transporter = nodemailer.createTransport({
               //service: "Gmail",
               host: "smtp.gmail.com",
                port:465,
               secure: true,
               requireTLS: false,
               auth: {
                 user: "a37164710@gmail.com",
                 pass: "jrsnssdzpkdvxwqu"
               }
             });
             const mailOptions = {
               from: "juvenile@gmail.com",
               to: users.email,
               subject: 'Future smile registration confirmation mail',
               text: 'Yo have registered successfully in Smile app',
               //html: `
               //  <h1>Sample Heading Here</h1>
               //  <p>message here</p>
               //`,
               // attachments: [
               //   {
               //     filename: 'image.png',
               //     path: '<https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png>'
               //   }
               // ]
             };
             
             transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                 console.log(error);
               } else {
                 console.log('Email sent: ' + info.response);
               }
             });
           
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

// const adminLogin = async (req, res) => {
//    console.log("body",req.body)
//     await User.findOne({
//       where: {
//          email: req.body.email
//       },
//       raw: true
//    })
//     .then(data=>{
//       if(data && data.role=="admin"){
//          const hashedPassword = data.password
//          if(bcrypt.compareSync(req.body.password,hashedPassword)){
//             const token =jwt.sign({
//                email:data.email
//             },process.env.secret,{expiresIn:'10s'})
//             //res.cookie('adminToken',token,{maxAge:3600,httpOnly:true,secure:false})
//                if(token){
//                   res.status(200).json({status: 1,message:"Logged successfully",token:token})  
//                }else{
//                   res.status(401).json({status: 0,message:"Please Login"})   
//                }
//             //console.log('token---------',token
//             //console.log('cookie',req.cookies);

//             //console.log(data,"login successfully")
//             //res.status(200).json({status: 1,message:"Logged successfully",token:token})

//          } else if(data && data.role=="admin") {
//             res.status(400).json({status:1,message:"Bad Credentials"})
//             // console.log('password problem')
//        }
//        } else if(data && data.role =="user"){
//          res.status(420).json({status:1,message:"Not an admin"})

//        }
//     })







//Admin Login with only admin and not agency
//     const adminLogin = async (req, res) => {
//       console.log("body",req.body)
//        await User.findOne({
//          where: {
//             email: req.body.email
//          },
//          raw: true
//       })
//        .then(data=>{
//          if(data && data.role=="admin"){
//             const hashedPassword = data.password
//             if(bcrypt.compareSync(req.body.password,hashedPassword)){
//                const token =jwt.sign({
//                   email:data.email
//                },process.env.secret,{expiresIn:'12hr'})
//                //res.cookie('adminToken',token,{maxAge:3600,httpOnly:true,secure:false})
//                   if(token){
//                      res.status(200).json({status: 1,message:"Logged successfully",token:token})  
//                   }else{
//                      res.status(401).json({status: 0,message:"Please Login"})   
//                   }
//                //console.log('token---------',token
//                //console.log('cookie',req.cookies);
   
//                //console.log(data,"login successfully")
//                //res.status(200).json({status: 1,message:"Logged successfully",token:token})
   
//             } else if(data && data.role=="admin") {
//                res.status(400).json({status:1,message:"Bad Credentials"})
//                // console.log('password problem')
//           }
//           } else if(data && data.role =="user"){
//             res.status(420).json({status:1,message:"Not an admin"})
   
//           }
//        })

//         //*************************************** */


    


 
// }

//inside up bracket
  // console.log('datas', datas)
   // if (datas && datas.role == "1") {
   //    const hashedPassword = datas.password
   //    if (bcrypt.compareSync(req.body.password, hashedPassword)) {
   //       const token = jwt.sign({
   //          email: datas.email
   //       }, 'auth', { expiresIn: "1hr" })
   //       //res.cookie('adminToken', token,{maxAge:3600,httpOnly:true,secure:false})
   //       console.log('cookie---',req.cookies)

   //       //console.log('token---------',token)


   //       console.log(datas,"login successfully")
   //       res.status(200).json({ status: 1, message: "Logged successfully", token:token })

   //    }
   // }





// Admin login with admin and agency original 2
// const adminLogin = async (req, res) => {
//    console.log("body",req.body)
//     await User.findOne({
//       where: {
//          email: req.body.email
//       },
//       raw: true
//    })
//     .then(data=>{
//       if(data && data.roles=="admin"|| data.roles=="agency"){
//          const hashedPassword = data.password
//          if(bcrypt.compareSync(req.body.password,hashedPassword)){
//             const token =jwt.sign({
//                email:data.email
//             },process.env.secret,{expiresIn:'3hr'})
//             //res.cookie('adminToken',token,{maxAge:3600,httpOnly:true,secure:false})
//                if(token){
//                   res.status(200).json({status: 1,message:"Logged successfully",token:token})  
//                }else{
//                   res.status(401).json({status: 0,message:"Please Login"})   
//                }
      

//          } else if(data && data.role=="admin") {
//             res.status(400).json({status:1,message:"Bad Credentials"})
//             // console.log('password problem')
//        }
//        } else if(data && data.role =="user"){
//          res.status(420).json({status:1,message:"Not an admin"})

//        }
//     })

//    }








  // Original login
   // const adminLogin = async (req, res) => {
   //    console.log("body",req.body)
   //     await Admin.findOne({
   //       where: {
   //          email: req.body.email
   //       },
   //       attributes:{exclude:['name','phone','username','image','adminType','countryId','status','createdAt','updatedAt']}, 
   //       include:[{
   //          model:Role,
   //          attributes:['Id'],
   //          as:"role"
   //         }], 
   //       raw: true
   //    })
   //     .then(data=>{
        
   //       if(data && data.roles=="admin"|| data.roles=="agency"){
   //          const roleId = data.roleId
   //          const rolename = data.roles
   //          const hashedPassword = data.password
   //          if(bcrypt.compareSync(req.body.password,hashedPassword)){
   //             const token =jwt.sign({
   //                email:data.email,
   //             },process.env.secret,{expiresIn:'3hr'})
   //             //res.cookie('adminToken',token,{maxAge:3600,httpOnly:true,secure:false})
   //                if(token){
   
   //                   res.status(200).json({status: 1,message:"Logged successfully",token:token,roleId:roleId,rolename:rolename})  
   //                }else{
   //                   res.status(401).json({status: 0,message:"Please Login"})   
   //                }
         
   
   //          } else if(data && data.role=="admin") {
   //             res.status(400).json({status:1,message:"Bad Credentials"})
   //             // console.log('password problem')
   //        }
   //        } else if(data && data.role =="user"){
   //          res.status(420).json({status:1,message:"Not an admin"})
   
   //        }
   //     })
   
   //    }
    

      const adminLogin = async (req, res) => {
         console.log("body",req.body)
          await Admin.findOne({
            where: {
               email: req.body.email
            },
            attributes:{exclude:['name','phone','username','image','adminType','countryId','status','createdAt','updatedAt']}, 
            include:[{
               model:Role,
               attributes:['Id'],
               as:"role"
              }], 
            raw: true
         })
          .then(data=>{
           
            if(data && data.roles=="admin"|| data.roles=="agency"){
               const roleId = data.roleId
               const rolename = data.roles
               const hashedPassword = data.password
               if(bcrypt.compareSync(req.body.password,hashedPassword)){
                  const token =jwt.sign({
                     email:data.email,
                  },process.env.secret,{expiresIn:'3hr'})
                  //res.cookie('adminToken',token,{maxAge:3600,httpOnly:true,secure:false})
                     if(token){
                        const otp = OtpGenerator();
                        console.log("generated otp",otp);
                        const transporter = nodemailer.createTransport({
                           //service: "Gmail",
                           host: "smtp.gmail.com",
                            port:465,
                           secure: true,
                           requireTLS: false,
                           auth: {
                             user: "",
                             pass: ""
                           }
                         });
                         const mailOptions = {
                           from: "juvenile@gmail.com",
                           to: req.body.email,
                           subject: 'Future smile login mail',
                           text: `You are trying to access smile and your otp is:${otp}`,
                           //html: `
                           //  <h1>Sample Heading Here</h1>
                           //  <p>message here</p>
                           //`,
                           // attachments: [
                           //   {
                           //     filename: 'image.png',
                           //     path: '<https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png>'
                           //   }
                           // ]
                         };
                         
                         transporter.sendMail(mailOptions, function(error, info){
                           if (error) {
                             console.log(error);
                           } else {
                             console.log('Email sent: ' + info.response);
                           }
                         });
                        res.status(200).json({status: 1,message:"Logged successfully",token:token,roleId:roleId,rolename:rolename})  
                     }else{
                        res.status(401).json({status: 0,message:"Please Login"})   
                     }
            
      
               } else if(data && data.role=="admin") {
                  res.status(400).json({status:1,message:"Bad Credentials"})
                  // console.log('password problem')
             }
             } else if(data && data.role =="user"){
               res.status(420).json({status:1,message:"Not an admin"})
      
             }
          })
      
         }
       




// const verifyToken =(req,res)=>{
//      //console.log('token alive');
//         res.status(200).json({
//           message:'Token Verified Successfully',
//       flag: 1
//         })
// }











const verifyToken =(req,res)=>{
   console.log('token alive');
      res.status(200).json({
        message:'Token Verified Successfully',
    flag: 1
      })
}


// const adminAuth = (req, res, next) => {
//    if (req.admin) {
//       console.log('verified admin', req.admin)
//    } else {
//       res.status(404).json({ message: "login first" })
//       res.redirect("/")
//    }
// }





// const adminLogout = (res) => {
//    cookies.remove('token');
//    localStorage.clear();
//    res.render('/')
//    res.status(200).json({ message: "Logged out" })

// }




module.exports = {
   register,
   adminLogin,
   // adminLogout,
   //adminAuth,
   verifyToken,
}
