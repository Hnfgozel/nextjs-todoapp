import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    try {
        await mongoose.connect(uri, {
            dbName: "playfactory_todos",
        });

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};
