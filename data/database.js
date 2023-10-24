import mongoose from 'mongoose'
import {config} from "dotenv";
config({ 
    path: "./data/config.env",
})

// Connect to MongoDB
export const connectDB  = ()=>{  
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi"
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.error("Database Connection Error:", error);
    });
    
}