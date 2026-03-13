# 🏆BookMyTurf💻
![Hackron 2025](https://img.shields.io/badge/BookMyTurf-2025-blue.svg) ![Status](https://img.shields.io/badge/Status-Completed-success.svg)


# 📖 Overview

Welcome to **BookMyTurf** – the ultimate turf booking platform!  
Built with the **MERN Stack** and integrated with **AI & ML**, BookMyTurf allows users to discover, book, and manage turf spaces, while admins manage turf availability and events seamlessly.

---
# ✨Trophies
[![trophy](https://github-profile-trophy.vercel.app/?username=OneTeraByte7&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)

## 📋 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup Instructions](#-setup-instructions)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

**BookMyTurf** is designed to make turf booking simple and smart.  
It supports two types of users:
- **User:** Search, book, and pay for turfs.  
- **Admin:** Manage turfs, events, and bookings.

It also uses AI to optimize pricing, recommend turfs, detect occupancy, and more.

---

## 🚀 Features

### 🧑‍💻 User Features
- Sign Up / Log In with role-based access (User/Admin)
- Browse available turfs
- Book turfs on an hourly basis
- Payment interface (UI)
- AI-based turf recommendations
- Live chat support (Socket.io)
- Voice search and booking

### 🛠️ Admin Features
- Turf registration (profile form)
- Manage turfs and availability
- Host and manage events
- Booking history and payment history
- AI-powered maintenance alerts
- Fraud/spam booking detection

---

## 💻 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time Communication:** Socket.io
- **AI & ML:** Python (for model training), TensorFlow, scikit-learn
- **Deployment:** Render / Vercel / MongoDB Atlas

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend folder:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   🚀 Server running on port 5000
   ✅ MongoDB Connected
   ```

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in frontend folder:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the frontend:**
   ```bash
   npm start
   ```

   Browser will open at: `http://localhost:3000`

### 🎯 Quick Test

1. Go to `http://localhost:3000/signup`
2. Create an account:
   - Name: Test User
   - Email: test@example.com
   - Password: password123 (min 6 characters)
   - Role: User or Admin
3. Click Signup → Redirects to Login
4. Login with same credentials
5. You'll be redirected to your dashboard!

### 📚 Documentation

- **Backend API**: See `backend/API_DOCUMENTATION.md`
- **Backend Fixes**: See `backend/FIXES_SUMMARY.md`
- **Frontend Fixes**: See `frontend/FRONTEND_FIXES.md`
- **Complete Guide**: See `COMPLETE_FIX_SUMMARY.md`

---

## 📸 Screenshots

Landing Page 
![image](https://github.com/user-attachments/assets/782f7d5d-8332-4c1b-9d7d-382fd9e01e43)

Login & SignUp
![image](https://github.com/user-attachments/assets/665c26b4-42ea-48a6-8f06-a7f0d9a556f3)

Admin Dashboard
![image](https://github.com/user-attachments/assets/930562ed-426e-4b20-acf9-ca84482f6535)

User Dashboard
![image](https://github.com/user-attachments/assets/8610ed95-1b0b-4f63-8a7f-51080965ee58)

![image](https://github.com/user-attachments/assets/37edb906-a452-47e1-9eac-a12c90310f78)
![image](https://github.com/user-attachments/assets/e18feb33-d55e-4e52-9c81-94987f62ae30)
![image](https://github.com/user-attachments/assets/e1fbea33-1d28-446e-8edb-a90c290959e5)
![image](https://github.com/user-attachments/assets/3dc1130e-1d35-43c8-aa2a-9cf266aa72c9)
![image](https://github.com/user-attachments/assets/0f36d728-3255-40b0-8e3c-f630c3733029)
![image](https://github.com/user-attachments/assets/c9d7bd5a-3ba5-48f3-afbd-bd3ce5fcbfa7)


## 🚀 Future Improvements

- Integrate full payment gateway (Stripe, Razorpay)
- Push notifications via Email and SMS
- Develop a Mobile App using React Native
- Create Admin Analytics Dashboard
- Implement Auto-scheduling for turf maintenance
- Add more AI features like dynamic demand prediction
- Support multiple languages for broader user access
- Improve accessibility (A11y) for visually impaired users


## 🤝 Contributing

Contributions are highly welcome! 🎉

To contribute to **BookMyTurf**:
1. **Fork** the repository.
2. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/YourFeatureName
   ```

