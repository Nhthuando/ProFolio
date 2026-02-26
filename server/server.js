import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên ${PORT}`);
});