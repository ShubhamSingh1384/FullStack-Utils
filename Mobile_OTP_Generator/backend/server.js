// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoute = require('./routes/userRoutes.js')

dotenv.config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
// console.log(DB_URI);
mongoose.connect(DB_URI)
.then(()=>{
    console.log("database connected ")
})
.catch(error=>{
    console.log("error in db", error)
})

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/user', userRoute)


app.listen(PORT, (error)=>{
    if(error){
        console.log("error in server ", error)
        return;
    }
    console.log("server is running ", PORT)
})