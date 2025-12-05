import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
    if (isConnected) return;

    if (!process.env.MONGODB_URI) {
        throw new Error("Missing MONGODB_URI");
    }

    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "test",
    });

    isConnected = true;
    console.log("MongoDB Connected");
}
