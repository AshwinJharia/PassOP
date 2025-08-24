import database from '../config/database.js';

class Password {
    constructor() {
        this.collection = 'passwords';
    }

    async findByUserId(userId) {
        const db = database.getDb();
        return await db.collection(this.collection).find({ userId }).toArray();
    }

    async create(passwordData) {
        const db = database.getDb();
        return await db.collection(this.collection).insertOne({
            ...passwordData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async deleteByIdAndUserId(id, userId) {
        const db = database.getDb();
        return await db.collection(this.collection).deleteOne({ id, userId });
    }
}

export default new Password();