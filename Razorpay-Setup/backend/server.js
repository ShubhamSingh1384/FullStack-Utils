const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const cors = require('cors')

const paymentRoute = require('./routes/productRoute')

dotenv.config();
const PORT = process.env.PORT
const URI = process.env.URI
mongoose.connect(URI)
.then(()=>{
    console.log('Connected to DataBase');
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL
  credentials: true
}));


app.use('/api/user/v1', paymentRoute)


app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log("server is running on ", PORT);
})