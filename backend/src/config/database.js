import { MongoClient } from 'mongodb';

class Database {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        try {
            this.client = new MongoClient(process.env.MONGO_URI);
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    }

    getDb() {
        return this.db;
    }

    async close() {
        if (this.client) {
            await this.client.close();
        }
    }
}

export default new Database();