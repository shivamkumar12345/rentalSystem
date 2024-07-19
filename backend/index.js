const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

const db = require('./db.js')
const User = require('./models/users.js')
const Product =require('./models/products.js')
const cors = require('cors');
const userRouter = require('./routes/userRoute.js');

const { verifyToken } = require('./middleware.js');
const productRouter = require('./routes/productRoute.js');
const rentRouter = require('./routes/rentRoute.js')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded(extended=true));

app.use(userRouter);
app.use(productRouter);
app.use(rentRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT} port`);
})