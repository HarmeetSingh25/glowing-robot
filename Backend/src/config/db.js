import mongoose from "mongoose"
import Config from "./config.js"

const connectToDB = async ()=>{
    try {
        await mongoose.connect(Config.MONGODB_URL)
        console.log("mongo db connected");
        
    } catch (error) {
        throw new Error("Error in MongoDB" , error);
        
    }
}
export default connectToDB