const express = require('express');
const app = express();
require("dotenv/config")
 const  bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
// const authJwt = require('./helpers/jwt')
// const errorhandler = require("./helpers/error-handler")


// middleware
app.use(express.json());
 app.use(bodyParser.json({limit:"30mb", extended:true}));
 app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
const api = process.env.API_URL
app.use(morgan("tiny"))
app.use(cors())
app.options("*", cors())
app.use('/public/uploads', express.static(__dirname+'/public/uploads'))
// app.use(authJwt);
// app.use(errorhandler)




// routes
const productsRoutes = require("./routers/products")
const categoriesRoutes= require("./routers/categories")
const userRoutes = require("./routers/users")
const orderRoutes = require("./routers/orders")



app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)










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