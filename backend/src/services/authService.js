import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
    async register(username, password) {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await User.create({
            username,
            password: hashedPassword
        });
        
        return result;
    }

    async login(username, password) {
        const user = await User.findByUsername(username);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        return { token, username };
    }
}

export default new AuthService();