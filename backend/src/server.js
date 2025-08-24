import dotenv from 'dotenv';
import app from './app.js';
import database from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await database.connect();
        
        app.listen(PORT, () => {
            console.log(`Secure PassOp API listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();