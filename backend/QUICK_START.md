# 🚀 Quick Start Guide - BookMyTurf Backend

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Configure Environment
Create a `.env` file in the backend folder:
```env
MONGO_URI=mongodb+srv://suryawanshisoham7:Soham%401505@linkedin.sgr62ki.mongodb.net/?retryWrites=true&w=majority&appName=LinkedIn
JWT_SECRET=b101d42eb1f52d04cd5fdcb63badca9a4f2a604babdd96085523e15cac8b2aaa
PORT=5000
```

## Step 3: Start Server
```bash
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

---

## 🧪 Test the API

### 1. Create a User (Signup)
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "msg": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get All Turfs
```bash
GET http://localhost:5000/api/turfs
```

### 4. Create a Booking
```bash
POST http://localhost:5000/api/bookings
Content-Type: application/json

{
  "turfId": "turf_id_here",
  "date": "2024-03-20",
  "timeSlot": "10:00 AM - 11:00 AM"
}
```

### 5. Create an Event (Protected)
```bash
POST http://localhost:5000/api/events
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "eventName": "Sunday Football Match",
  "eventDate": "2024-03-20",
  "eventTime": "5:00 PM",
  "eventDescription": "Friendly match"
}
```

---

## 📝 Admin Account Setup

To create an admin account:

### Option 1: Signup with admin role
```json
{
  "name": "Admin User",
  "email": "admin@bookmyturf.com",
  "password": "admin123",
  "role": "admin"
}
```

### Option 2: Update existing user in MongoDB
```javascript
// In MongoDB Compass or Shell
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🎯 Admin-Only Features

With admin account, you can:

### 1. Create Turf
```bash
POST http://localhost:5000/api/turfs
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "turfName": "Green Field Arena",
  "location": "Mumbai",
  "pricePerHour": 800,
  "contactNumber": "+91 9876543210",
  "facilities": ["Parking", "Lights", "Washroom"],
  "description": "Best turf in Mumbai",
  "imageUrl": "https://example.com/image.jpg"
}
```

### 2. Update Turf
```bash
PUT http://localhost:5000/api/turfs/:id
Authorization: Bearer ADMIN_TOKEN
```

### 3. Delete Turf
```bash
DELETE http://localhost:5000/api/turfs/:id
Authorization: Bearer ADMIN_TOKEN
```

### 4. View All Bookings
```bash
GET http://localhost:5000/api/bookings
Authorization: Bearer ADMIN_TOKEN
```

---

## 🔍 API Filtering Examples

### Filter Turfs by Location
```
GET http://localhost:5000/api/turfs?location=Mumbai
```

### Filter by Price Range
```
GET http://localhost:5000/api/turfs?minPrice=500&maxPrice=1000
```

### Search Turfs
```
GET http://localhost:5000/api/turfs?search=football
```

### Combine Filters
```
GET http://localhost:5000/api/turfs?location=Mumbai&minPrice=500&search=arena
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
1. Check if MongoDB URI is correct in `.env`
2. Verify your IP is whitelisted in MongoDB Atlas
3. Test credentials are correct

### Token Invalid
1. Make sure token format is: `Bearer <token>`
2. Check token hasn't expired (7 days validity)
3. Verify JWT_SECRET matches in `.env`

### Port Already in Use
```bash
# Kill process using port 5000
npx kill-port 5000
```

---

## 📚 Documentation

- **API Documentation**: See `API_DOCUMENTATION.md`
- **Complete Changes**: See `FIXES_SUMMARY.md`
- **Project Details**: See `README.md`

---

## ✅ All Systems Ready!

Your backend is now fully functional with:
- ✅ Authentication & Authorization
- ✅ Turf Management
- ✅ Booking System
- ✅ Event Management
- ✅ Admin Controls
- ✅ Advanced Filtering
- ✅ Secure & Documented

Happy Coding! 🎉
