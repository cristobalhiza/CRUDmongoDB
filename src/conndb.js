import mongoose from "mongoose"; 
import config from "./config/config.js";

const connDB = async () => {
    try {
        await mongoose.connect(
            config.MONGO_URL,
            { dbName:config.DB_NAME }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

export default connDB;
