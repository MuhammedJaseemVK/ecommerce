const mongoose=require("mongoose");
const colors=require("colors");
const dotenv=require("dotenv");

dotenv.config();

const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(error){
        console.log(`Mongodb server issue ${error}`.bgRed.white);
    }

}

module.exports=connectDB;