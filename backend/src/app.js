import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/passwords.js';

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// Middleware
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

export default app;