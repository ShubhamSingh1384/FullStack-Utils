const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { AuthRoutes } = require('./routes/authRoute');



const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI ;

// Connect to MongoDB
mongoose.connect(DB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});


const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',AuthRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to the Gmail Functionality Backend!');
});


// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });



app.listen(PORT, (error) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
