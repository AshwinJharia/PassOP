import passwordService from '../services/passwordService.js';

class PasswordController {
    async getPasswords(req, res) {
        try {
            const passwords = await passwordService.getPasswords(req.user.userId);
            res.json(passwords);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async savePassword(req, res) {
        try {
            const result = await passwordService.savePassword(req.user.userId, req.body);
            res.json({ success: true, result });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async deletePassword(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'Password ID required' });
            }
            
            const result = await passwordService.deletePassword(req.user.userId, id);
            res.json({ success: true, result });
        } catch (error) {
            if (error.message === 'Password not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export default new PasswordController();