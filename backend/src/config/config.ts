import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/dental_supplies',
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_secret'
};