import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 5812;
app.use(express.json())
app.use('/api/auth', authRoutes);

try {
    mongoose.connect(MONGODB_URI)
    .then(console.log("connected successfully"))
} catch (error) {
    console.log('not CONNNECTED', error.message);
}

app.listen(PORT, () => {
    console.log('running on port 5812');
})