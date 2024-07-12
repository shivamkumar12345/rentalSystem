const express = require('express')
const app = express();
const db = require('./db.js')
const User = require('./models/users.js')
const Product =require('./models/products.js')
const cors = require('cors');
const userRouter = require('./routes/userRoutes.js');

const { verifyToken } = require('./middleware.js');
const productRouter = require('./routes/productsRoute.js');
const rentRouter = require('./routes/rentRoute.js')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded(extended=true));

app.use(userRouter);
app.use(productRouter);
app.use(rentRouter)



app.listen(8080, ()=>{
    console.log("server started at 8080 port");
})