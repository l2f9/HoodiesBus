import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // If no MongoDB URI provided, run in database-less mode
    if (!mongoURI) {
      console.log('⚠️  MongoDB URI not configured - running without database');
      console.log('💡 App will work but design saving/gallery features will be unavailable');
      return;
    }

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Continuing without database - some features will be unavailable');
    // Don't exit - continue running without database
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});
