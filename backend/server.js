const express= require("express");
const dotenv=require("dotenv");
dotenv.config();
const colors=require("colors");
const morgan=require("morgan");
const connectDB=require("./config/db");
const userRoutes =require("./routes/userRoutes");
const cors = require("cors");

connectDB();

const PORT= process.env.PORT || 8080

const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userRoutes);

app.listen(PORT,()=>{
    console.log(`Sever running on port ${PORT}`.bgCyan.white);
})