const express =require('express');
port=3000;
require('dotenv').config();
const  app =express();

app.use(express.json());





const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const productRoutes = require('./routes/product');

app.use('/api',productRoutes);

app.listen(8005,()=>{
    console.log('start the server');
    
    mongoose.connect('mongodb+srv://sanket:patel@cluster0.gyaj5.mongodb.net/employee-data?retryWrites=true&w=majority'
    ,{},
    (err)=>{
             if(err)console.log(err.message);


             console.log('connected to mongodb');
    });
});