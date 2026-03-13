# BookMyTurf Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 📌 Auth Routes (`/api/auth`)

### 1. **Signup**
- **Endpoint**: `POST /api/auth/signup`
- **Description**: Register a new user
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional: "user" or "admin"
}
```
- **Response**:
```json
{
  "msg": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. **Login**
- **Endpoint**: `POST /api/auth/login`
- **Description**: Login existing user
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. **Get Current User**
- **Endpoint**: `GET /api/auth/me`
- **Description**: Get logged-in user details
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🏟️ Turf Routes (`/api/turfs`)

### 1. **Get All Turfs**
- **Endpoint**: `GET /api/turfs`
- **Description**: Get all turfs with optional filters
- **Query Params**:
  - `location`: Filter by location (case-insensitive)
  - `minPrice`: Minimum price per hour
  - `maxPrice`: Maximum price per hour
  - `search`: Search in name or description
- **Example**: `GET /api/turfs?location=Mumbai&minPrice=500&maxPrice=1000`
- **Response**:
```json
[
  {
    "_id": "turf_id",
    "turfName": "Green Field Arena",
    "location": "Mumbai",
    "pricePerHour": 800,
    "contactNumber": "+91 9876543210",
    "facilities": ["Parking", "Lights", "Washroom"],
    "description": "Best turf in Mumbai",
    "imageUrl": "image_url",
    "availability": true,
    "rating": 4.5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. **Get Single Turf**
- **Endpoint**: `GET /api/turfs/:id`
- **Description**: Get turf by ID
- **Response**: Single turf object

### 3. **Create Turf** (Admin Only)
- **Endpoint**: `POST /api/turfs`
- **Description**: Create a new turf
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**:
```json
{
  "turfName": "Green Field Arena",
  "location": "Mumbai",
  "pricePerHour": 800,
  "contactNumber": "+91 9876543210",
  "facilities": ["Parking", "Lights", "Washroom"],
  "description": "Best turf in Mumbai",
  "imageUrl": "image_url"
}
```

### 4. **Update Turf** (Admin Only)
- **Endpoint**: `PUT /api/turfs/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**: Fields to update

### 5. **Delete Turf** (Admin Only)
- **Endpoint**: `DELETE /api/turfs/:id`
- **Headers**: `Authorization: Bearer <admin_token>`

---

## 📅 Booking Routes (`/api/bookings`)

### 1. **Create Booking**
- **Endpoint**: `POST /api/bookings`
- **Description**: Create a new booking
- **Body**:
```json
{
  "turfId": "turf_id",
  "userId": "user_id", // optional
  "date": "2024-01-15",
  "timeSlot": "10:00 AM - 11:00 AM"
}
```
- **Response**:
```json
{
  "msg": "Booking created successfully",
  "booking": {
    "_id": "booking_id",
    "turfId": "turf_id",
    "userId": "user_id",
    "date": "2024-01-15",
    "timeSlot": "10:00 AM - 11:00 AM",
    "totalPrice": 800,
    "status": "confirmed",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. **Get All Bookings** (Admin Only)
- **Endpoint**: `GET /api/bookings`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Description**: Get all bookings with turf and user details

### 3. **Get User Bookings**
- **Endpoint**: `GET /api/bookings/my-bookings/:userId`
- **Description**: Get all bookings for a specific user

### 4. **Cancel Booking**
- **Endpoint**: `PATCH /api/bookings/:id/cancel`
- **Description**: Cancel a booking

---

## 🎉 Event Routes (`/api/events`)

### 1. **Create Event** (Protected)
- **Endpoint**: `POST /api/events`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "eventName": "Sunday Football Match",
  "eventDate": "2024-01-20",
  "eventTime": "5:00 PM",
  "eventDescription": "Friendly football match"
}
```

### 2. **Get All Events**
- **Endpoint**: `GET /api/events`
- **Description**: Get all events with creator details

### 3. **Get Single Event**
- **Endpoint**: `GET /api/events/:id`

### 4. **Get User's Events**
- **Endpoint**: `GET /api/events/user/:userId`
- **Description**: Get all events created by a user

### 5. **Update Event** (Protected)
- **Endpoint**: `PUT /api/events/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Only event creator can update

### 6. **Delete Event** (Protected)
- **Endpoint**: `DELETE /api/events/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Only event creator can delete

---

## 🔐 Error Responses

### Common Error Codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

### Error Response Format:
```json
{
  "msg": "Error message here"
}
```

---

## 📝 Notes

1. **Password Requirements**: Minimum 6 characters
2. **Token Expiry**: 7 days
3. **Admin Access**: Required for turf management and viewing all bookings
4. **Booking Validation**: Prevents double-booking of same time slot
5. **Event Management**: Only creator can update/delete their events
