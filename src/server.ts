import app from './app';
import connectDB from './config/db';
// 0) HANDLE UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// 1) CONNECT DATABASE
connectDB();

// 2) SETTING PORT AND LISTEN SEVER
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} with environment ${process.env.NODE_ENV}`
  );
});

// 3) HANDLE UNHANDLED REJECTION!
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
