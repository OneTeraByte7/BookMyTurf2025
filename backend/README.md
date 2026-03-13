# BookMyTurf Backend

Backend API for BookMyTurf - A turf booking and management system.

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Role-based Access Control (User/Admin)
- ✅ Turf Management (CRUD operations)
- ✅ Booking System with conflict prevention
- ✅ Event Management
- ✅ Advanced filtering and search
- ✅ Secure password hashing (bcrypt)
- ✅ API logging and security headers

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

## 🛠️ Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📁 Project Structure

```
backend/
├── controllers/
│   └── eventController.js
├── middleware/
│   ├── auth.js
│   └── isAdmin.js
├── models/
│   ├── User.js
│   ├── Turf.js
│   ├── Booking.js
│   └── Event.js
├── routes/
│   ├── authRoutes.js
│   ├── turfRoutes.js
│   ├── bookingRoutes.js
│   └── eventRoutes.js
├── .env
├── server.js
└── package.json
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Secret key for JWT signing | your_secret_key_here |
| PORT | Server port | 5000 |

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints and usage.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet for security headers
- CORS enabled
- Request logging with Morgan
- Role-based access control

## 🧪 Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- cURL

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **dotenv**: Environment variables

## 🐛 Common Issues

### MongoDB Connection Error
- Check your MongoDB URI in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials

### Authentication Failed
- Ensure JWT_SECRET is set in `.env`
- Check token format: `Bearer <token>`
- Verify token hasn't expired

## 📝 License

ISC

## 👤 Author

Your Name
