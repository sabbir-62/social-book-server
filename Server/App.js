const {readdirSync}= require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressRateLimit = require('express-rate-limit');
const limiter = expressRateLimit({windowMs: 15 * 60 * 1000,max: 100,standardHeaders: true,legacyHeaders: false});
const morgan = require('morgan');
require('dotenv').config();
const {PORT,DATA} = process.env;


// security middleware....
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);


// listen Router file....
readdirSync('./Routers').map(R=>app.use('/api/v1',require(`./Routers/${R}`)));

// server error handling .....
app.use('*',(req,res)=>{
    res.status(404).json({message:"Something is happening please try again."});
});


// exports app,port,mongoose....
module.exports = {PORT,app,mongoose,DATA};