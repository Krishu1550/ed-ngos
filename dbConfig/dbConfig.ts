import mongoose from "mongoose";

// Ensure the MongoDB URI is available

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
console.log(MONGODB_URI);
if (!MONGODB_URI) {
    throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

declare global {
    var mongoose: {
        promise: Promise<mongoose.Connection> | null;
        connection: mongoose.Connection | null;
    };
}
const config = global.mongoose || { promise: null, connection: null };

export default async function initializeDatabase() {
    // Database initialization logic here
    if (config.connection) {
        return config.connection;

    }
    if (!config.promise) {
        config.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
            return mongoose.connection;
        });
        try {
            config.connection = await config.promise;
            console.log("Database connected successfully");
        }
        catch (error) {
            config.promise = null;
            config.connection = null;
            console.error("Database connection failed", error);
            throw error;
        }
    }

    return config.connection;
}