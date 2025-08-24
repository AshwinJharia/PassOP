# PassOp - Secure Credentials Manager

<div align="center">
  <h3>🔐 Your Personal Credentials Vault</h3>
  <p>A production-ready credentials manager built with React and Node.js featuring enterprise-level security</p>
</div>

## ✨ Features

- 🔐 **Secure Storage** - AES encryption for all credentials
- 🔑 **JWT Authentication** - Secure user sessions with 24h expiration
- 🛡️ **Password Hashing** - bcrypt with 12 rounds for user passwords
- ⚡ **Rate Limiting** - Protection against brute force attacks
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎯 **Modern UI** - Clean interface with Tailwind CSS
- 🔄 **Real-time Updates** - Instant credential management

## 🏗️ Architecture

### Backend (Node.js + Express)
```
backend/src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Auth & validation
├── models/         # Data models
├── routes/         # API endpoints
├── services/       # Business logic
├── utils/          # Utility functions
└── server.js       # Entry point
```

### Frontend (React 18)
```
frontend/src/
├── components/     # UI components
├── context/        # State management
├── hooks/          # Custom hooks
├── pages/          # Route components
├── services/       # API layer
├── utils/          # Helper functions
└── App.jsx         # Main component
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/passop.git
cd passop
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## ⚙️ Environment Configuration

Create `backend/.env` file:
```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=passop
JWT_SECRET=your-super-secret-jwt-key-change-this
ENCRYPTION_KEY=your-32-character-encryption-key-here
PORT=3000
```

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |

### Credentials (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/passwords` | Get user credentials |
| POST | `/api/passwords` | Save credential |
| DELETE | `/api/passwords` | Delete credential |

## 🛡️ Security Features

- **🔐 End-to-End Encryption** - AES encryption for stored credentials
- **🔑 Secure Authentication** - JWT tokens with expiration
- **🛡️ Password Hashing** - bcrypt with salt rounds
- **⚡ Rate Limiting** - 100 requests per 15 minutes
- **✅ Input Validation** - Joi schema validation
- **🔒 CORS Protection** - Configured security headers
- **👤 User Isolation** - Each user can only access their own data

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with native driver
- JWT for authentication
- bcrypt for password hashing
- Joi for validation
- ES6 modules

**Frontend:**
- React 18 with Hooks
- Context API for state management
- Tailwind CSS for styling
- React Toastify for notifications
- Vite for build tooling

## 🔧 Development

```bash
# Backend with auto-reload
cd backend && npm run dev

# Frontend with hot reload
cd frontend && npm run dev
```

## 📦 Production Deployment

1. **Environment Setup**
   - Use strong JWT secrets and encryption keys
   - Configure MongoDB Atlas or secure MongoDB instance
   - Enable HTTPS
   - Set proper CORS origins

2. **Backend Deployment**
   - Use PM2 or similar process manager
   - Set NODE_ENV=production
   - Configure reverse proxy (nginx)

3. **Frontend Deployment**
   - Build: `npm run build`
   - Deploy to CDN or static hosting
   - Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by security-first design principles
- Community feedback and contributions

---

<div align="center">
  <p>Made with ❤️ for secure credential management</p>
</div>