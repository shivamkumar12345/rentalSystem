const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("data base has been connected successfully");
})
.catch((err)=>{
        console.log(err);
});