import database from '../config/database.js';

class User {
    constructor() {
        this.collection = 'users';
    }

    async findByUsername(username) {
        const db = database.getDb();
        return await db.collection(this.collection).findOne({ username });
    }

    async create(userData) {
        const db = database.getDb();
        return await db.collection(this.collection).insertOne({
            ...userData,
            createdAt: new Date()
        });
    }
}

export default new User();