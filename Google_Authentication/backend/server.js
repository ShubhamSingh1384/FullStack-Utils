const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const cors = require('cors')

const authRoute = require('./routes/authRoute')

const passport = require('passport')
//passport configuration
require('./config/passport')

const PORT = process.env.PORT
const URI = process.env.URI
mongoose.connect(URI)
.then(()=>{
    console.log("DB connected")
})
.catch((error)=>{
    console.log("DB connection failed", error)
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.UI_URL,
    credentials: true
}))

app.use(passport.initialize());

//route
app.use('/auth', authRoute);

// app.get('/success-login', (req, res) => {
//     res.send('Login successful');
// });



app.listen(PORT, (error)=>{
    if (error) {
        console.log(error);
        return ;
    }
    console.log(`Server is running on port ${PORT}`);
})