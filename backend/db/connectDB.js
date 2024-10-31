import mongoose from "mongoose";

export const connectDB = async function(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error Connecting to Mongo DB ${err}`);
        process.exit(1);
    }
}