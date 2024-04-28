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
        console.error('MONGODB_URI is not defined in environment variables.');
        return;
    }

    try {
        await mongoose.connect(uri, {
            dbName: "playfactory_todos",
        });

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
};
