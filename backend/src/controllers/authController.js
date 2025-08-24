import authService from '../services/authService.js';

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            await authService.register(username, password);
            res.status(201).json({ success: true, message: 'User created successfully' });
        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.json({ success: true, ...result });
        } catch (error) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export default new AuthController();