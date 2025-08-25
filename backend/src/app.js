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
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean),
    credentials: true
}));

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'PassOp API is running!', status: 'success' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;