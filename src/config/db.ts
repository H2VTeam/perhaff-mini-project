import mongoose from 'mongoose';

const URI = process.env.DATABASE;

const connectDB = () => {
  mongoose.connect(
    `${URI}`,
    {
      socketTimeoutMS: 0,
      keepAlive: true,
    },
    (err) => {
      if (err) throw err;
      console.log('DB connection successful!');
    }
  );
};

export default connectDB;
