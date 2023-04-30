const express = require('express');
const {Category}= require("./models/categories/categories")
const {Product}= require("./models/products/products")
const app = express();
require("dotenv/config")
const  bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
require("./models/products/products")
const {User} = require("./models/products/User")
// const Employee = mongoose.model("employee")
// const User= mongoose.model("user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "uewyjrgwiu3468edhgfj";
const categoriesRoutes= require("./routes/categories")
const productRouter = require("./routes/Products")




// middleware
app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
const api = process.env.API_URL
app.use(morgan("tiny"))
app.use(cors())
app.options("*", cors())
app.use('/public/uploads', express.static(__dirname+'/public/uploads'))
app.use(cookieParser());




app.use('/categories', categoriesRoutes)
app.use(`/send`,  productRouter)


app.post("/register", async(req, res)=>{
   const {name, email, password} = req.body;
try {
   const userDoc= await User.create({
       name, email,
        password:bcrypt.hashSync(password, bcryptSalt)
      })
       res.json(userDoc)
  
} catch (e) {
   res.status(422).json(e)
}
})


app.post("/login", async(req, res)=>{
   const {email, password}= req.body
   const userDoc = await User.findOne({email});
   if(userDoc){
       const passOk = bcrypt.compareSync(password, userDoc.password)
   if(passOk){
       jwt.sign({email:userDoc.email, id:userDoc._id, name:userDoc.name}, jwtSecret, {}, (err, token)=>{
           if(err) throw err;
           res.status(200).send({
            msg: "Login Successful...!",
            username: passOk.username,
            userDoc:userDoc,
            token
        })
      //   res.json(userDoc)
       })
      
   } else{
       res.status(422).json("pass not ok")
   }
   } else{
       res.json("pass not found");
   }
})


app.get("/profile", (req, res)=>{
const {token} = req.cookies;
if(token){
   jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
if (err) throw err;
const {name,email,_id}= await User.findById(userData.id)
res.json({name, email, _id})
   })
}else {
   res.json(null)
}
})


app.post("/logout", (req, res)=>{
   res.cookie("token", "").json(true);
});









 mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:"farm",
 })
 .then(()=>{
    console.log("Mongo is ready")
 })
 .catch((err)=>{
    console.log(err)
 })
app.listen(3000, () => {
    console.log(api)
  console.log('server is working on http://localhost:3000');
});