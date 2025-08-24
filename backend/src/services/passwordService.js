import Password from '../models/Password.js';
import { encryptPassword, decryptPassword } from '../utils/encryption.js';
import { randomUUID } from 'crypto';

class PasswordService {
    async getPasswords(userId) {
        const passwords = await Password.findByUserId(userId);
        
        return passwords.map(p => ({
            ...p,
            password: decryptPassword(p.password, process.env.ENCRYPTION_KEY)
        }));
    }

    async savePassword(userId, { site, username, password, id }) {
        const encryptedPassword = encryptPassword(password, process.env.ENCRYPTION_KEY);
        
        const passwordData = {
            site,
            username,
            password: encryptedPassword,
            userId,
            id: id || randomUUID()
        };
        
        if (id) {
            await Password.deleteByIdAndUserId(id, userId);
        }
        
        return await Password.create(passwordData);
    }

    async deletePassword(userId, id) {
        const result = await Password.deleteByIdAndUserId(id, userId);
        
        if (result.deletedCount === 0) {
            throw new Error('Password not found');
        }
        
        return result;
    }
}

export default new PasswordService();