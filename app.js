const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;
const key = process.env.JWT_SECRET_KEY;

mongoose.connect(mongoURI,{ useNewUrlParser : true })
.then(()=>{
    console.log("mongoose connected");
})
.catch((err)=>{
    console.error("Mongoose connection error:", err);
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});