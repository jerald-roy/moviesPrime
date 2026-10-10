import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (err) {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1)
    }
}

