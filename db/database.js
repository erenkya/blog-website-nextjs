import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (mongoose.connection.readyState === 1) {
        // 1 = connected
        console.log("MongoDB already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (e) {
        console.log("MongoDB connection error:", e);
    }
};

export default connectDB;
