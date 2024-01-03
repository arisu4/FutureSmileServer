const express = require("express")
const bodyParser= require("body-parser")
const path = require('path')
//const BASE_URL = process.env.PORT
const cookieparser = require('cookie-parser')
const session = require('express-session')
const adminAuth  = require('../server/Middleware/adminAuth')
//const mysql = require('mysql')
//const expressValidator = require('express-validator')
//const path = require('path')
require('dotenv').config()
let cors = require('cors')

const app = express()


//middleware
app.use(cors())
 app.use( express.static(path.join(__dirname, 'Public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(session({
    cookie:{maxAge:10000},
    secret:'auth',
    resave:false,
    saveUninitialized:false
}))
app.use(adminAuth.authjwt)



app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}))


const ContactRouter = require(`./Routes/ClientRoute`)
app.use(ContactRouter)

const AdminAboutRouter = require("./Routes/AdminRoutes/AdminAbout")
app.use(AdminAboutRouter)

const AdminHomeRouter  = require("./Routes/AdminRoutes/AdminHome")
app.use(AdminHomeRouter)

const AdminContactRouter  = require("./Routes/AdminRoutes/AdminContact")
app.use(AdminContactRouter)

const AdminGalleryRouter  = require("./Routes/AdminRoutes/AdminGallery")
app.use(AdminGalleryRouter)

const AdminServiceRouter  = require("./Routes/AdminRoutes/AdminServices")
app.use(AdminServiceRouter)

const AdminLoginRouter = require("./Routes/AdminRoutes/AdminLogin")
app.use(AdminLoginRouter)



// const AdminRouter = require(`./Routes/AdminRoute`)
// app.use(AdminRouter)

const ClientAboutRouter = require("./Routes/ClientRoutes/ClientAbout")
app.use(ClientAboutRouter)

const ClientContactRouter = require("./Routes/ClientRoutes/ClientContact")
app.use(ClientContactRouter)

const ClientServiceRouter = require("./Routes/ClientRoutes/ClientService")
app.use(ClientServiceRouter)

const ClientGalleryRouter = require("./Routes/ClientRoutes/ClientGallery")
app.use(ClientGalleryRouter)

const ClientQueryRouter = require("./Routes/ClientRoutes/ClientQuery")
app.use(ClientQueryRouter)

const ClientVideoRouter = require("./Routes/ClientRoutes/ClientVideo")
app.use(ClientVideoRouter)

const ClientStoryRouter = require("./Routes/ClientRoutes/ClientStory")
app.use(ClientStoryRouter)

//console.log('port',PORT)
const port =  process.env.PORT






app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})