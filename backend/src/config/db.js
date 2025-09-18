import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

        console.log("Connected to Database... ")
    }
    catch (error) {

        console.error("Cannot connect to Database... ", error)
        process.exit(1);
    }
}