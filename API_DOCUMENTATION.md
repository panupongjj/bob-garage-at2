# Bob's Garage API Documentation

## Base URL

```
http://localhost:3001/api
```

## Table of Contents

- [Authentication](#authentication)
- [Health Check](#health-check)
- [Authentication Endpoints](#authentication-endpoints)
- [Services Endpoints](#services-endpoints)
- [Staff Endpoints](#staff-endpoints)
- [Saved Items Endpoints](#saved-items-endpoints)
- [Error Responses](#error-responses)
- [Data Models](#data-models)

---

## Authentication

Most endpoints require authentication using a Bearer token. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

**Token Expiration:** 7 days

**Roles:**

- `user` - Regular user (default)
- `admin` - Administrator (required for create/update/delete operations)

---

## Health Check

### GET /api/health

Check if the server is running.

**No authentication required**

**Response:**

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**No authentication required**

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `name`: Required, string, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "themePreference": "light"
  }
}
```

**Error Responses:**

- `400` - Validation failed or email already registered
- `500` - Registration failed

---

### POST /api/auth/login

Login with email and password.

**No authentication required**

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "themePreference": "light"
  }
}
```

**Error Responses:**

- `400` - Validation failed
- `401` - Invalid credentials
- `500` - Login failed

---

### GET /api/auth/profile

Get the current user's profile.

**Authentication required**

**Success Response (200):**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "themePreference": "light"
  }
}
```

**Error Responses:**

- `401` - Unauthorized (no token or invalid token)
- `500` - Failed to get profile

---

## Services Endpoints

### GET /api/services

Get all services.

**No authentication required**

**Success Response (200):**

```json
[
  {
    "id": 1,
    "name": "Oil Change",
    "description": "Full service oil change with filter replacement",
    "price": "50.00",
    "imageUrl": "https://cloudinary.com/image.jpg"
  },
  {
    "id": 2,
    "name": "Brake Service",
    "description": "Complete brake inspection and service",
    "price": "150.00",
    "imageUrl": "https://cloudinary.com/image2.jpg"
  }
]
```

**Error Response:**

- `500` - Failed to fetch services

---

### POST /api/services

Create a new service.

**Authentication required (Admin only)**

**Request Body (form-data):**

- `name`: Required, string, 2-200 characters
- `description`: Required, string, 10-1000 characters
- `price`: Required, positive number with 2 decimal places
- `image`: Optional, image file (max 5MB)

**Validation Rules:**

- `name`: Required, 2-200 characters
- `description`: Required, 10-1000 characters
- `price`: Required, positive number, 2 decimal precision
- `image`: Optional, image file only, max 5MB

**Example Request (Postman):**

```
POST /api/services
Headers:
  Authorization: Bearer <token>
Body (form-data):
  name: Oil Change
  description: Full service oil change with filter replacement
  price: 50.00
  image: [file]
```

**Success Response (201):**

```json
{
  "id": 1,
  "name": "Oil Change",
  "description": "Full service oil change with filter replacement",
  "price": "50.00",
  "imageUrl": "https://cloudinary.com/image.jpg"
}
```

**Error Responses:**

- `400` - Validation failed or file upload error
- `401` - Unauthorized
- `403` - Admin access required
- `500` - Failed to create service or upload image

---

### PUT /api/services/:id

Update an existing service.

**Authentication required (Admin only)**

**URL Parameters:**

- `id`: Required, positive integer

**Request Body (form-data):**

- `name`: Optional, string, 2-200 characters
- `description`: Optional, string, 10-1000 characters
- `price`: Optional, positive number with 2 decimal places
- `image`: Optional, image file (max 5MB)

**Note:** All fields are optional. You can update only the image, or any combination of fields.

**Example Request (Postman):**

```
PUT /api/services/1
Headers:
  Authorization: Bearer <token>
Body (form-data):
  name: Premium Oil Change
  price: 75.00
  image: [file]
```

**Success Response (200):**

```json
{
  "id": 1,
  "name": "Premium Oil Change",
  "description": "Full service oil change with filter replacement",
  "price": "75.00",
  "imageUrl": "https://cloudinary.com/new-image.jpg"
}
```

**Error Responses:**

- `400` - Validation failed or file upload error
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Service not found
- `500` - Failed to update service or upload image

---

### DELETE /api/services/:id

Delete a service.

**Authentication required (Admin only)**

**URL Parameters:**

- `id`: Required, positive integer

**Success Response (200):**

```json
{
  "message": "Service deleted successfully"
}
```

**Error Responses:**

- `400` - Invalid ID format
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Service not found
- `500` - Failed to delete service

---

## Staff Endpoints

### GET /api/staff

Get all staff members.

**No authentication required**

**Success Response (200):**

```json
[
  {
    "id": 1,
    "name": "Bob Johnson",
    "role": "Master Mechanic",
    "bio": "Bob has been working on cars for over 20 years...",
    "imageUrl": "https://cloudinary.com/bob.jpg"
  },
  {
    "id": 2,
    "name": "Alice Smith",
    "role": "Service Advisor",
    "bio": "Alice helps customers find the right services...",
    "imageUrl": "https://cloudinary.com/alice.jpg"
  }
]
```

**Error Response:**

- `500` - Failed to fetch staff

---

### POST /api/staff

Create a new staff member.

**Authentication required (Admin only)**

**Request Body (form-data):**

- `name`: Required, string, 2-100 characters
- `role`: Required, string, 2-100 characters
- `bio`: Required, string, 10-500 characters
- `image`: Optional, image file (max 5MB)

**Validation Rules:**

- `name`: Required, 2-100 characters
- `role`: Required, 2-100 characters
- `bio`: Required, 10-500 characters
- `image`: Optional, image file only, max 5MB

**Example Request (Postman):**

```
POST /api/staff
Headers:
  Authorization: Bearer <token>
Body (form-data):
  name: Bob Johnson
  role: Master Mechanic
  bio: Bob has been working on cars for over 20 years...
  image: [file]
```

**Success Response (201):**

```json
{
  "id": 1,
  "name": "Bob Johnson",
  "role": "Master Mechanic",
  "bio": "Bob has been working on cars for over 20 years...",
  "imageUrl": "https://cloudinary.com/bob.jpg"
}
```

**Error Responses:**

- `400` - Validation failed or file upload error
- `401` - Unauthorized
- `403` - Admin access required
- `500` - Failed to create staff member or upload image

---

### PUT /api/staff/:id

Update an existing staff member.

**Authentication required (Admin only)**

**URL Parameters:**

- `id`: Required, positive integer

**Request Body (form-data):**

- `name`: Optional, string, 2-100 characters
- `role`: Optional, string, 2-100 characters
- `bio`: Optional, string, 10-500 characters
- `image`: Optional, image file (max 5MB)

**Note:** All fields are optional. You can update only the image, or any combination of fields.

**Example Request (Postman):**

```
PUT /api/staff/1
Headers:
  Authorization: Bearer <token>
Body (form-data):
  role: Senior Master Mechanic
  image: [file]
```

**Success Response (200):**

```json
{
  "id": 1,
  "name": "Bob Johnson",
  "role": "Senior Master Mechanic",
  "bio": "Bob has been working on cars for over 20 years...",
  "imageUrl": "https://cloudinary.com/new-bob.jpg"
}
```

**Error Responses:**

- `400` - Validation failed or file upload error
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Staff member not found
- `500` - Failed to update staff member or upload image

---

### DELETE /api/staff/:id

Delete a staff member.

**Authentication required (Admin only)**

**URL Parameters:**

- `id`: Required, positive integer

**Success Response (200):**

```json
{
  "message": "Staff member deleted successfully"
}
```

**Error Responses:**

- `400` - Invalid ID format
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Staff member not found
- `500` - Failed to delete staff member

---

## Saved Items Endpoints

### GET /api/saved-items

Get all saved items for the current user.

**Authentication required**

**Success Response (200):**

```json
[
  {
    "id": 1,
    "userId": 1,
    "serviceId": 1,
    "service": {
      "id": 1,
      "name": "Oil Change",
      "description": "Full service oil change with filter replacement",
      "price": "50.00",
      "imageUrl": "https://cloudinary.com/image.jpg"
    }
  },
  {
    "id": 2,
    "userId": 1,
    "serviceId": 2,
    "service": {
      "id": 2,
      "name": "Brake Service",
      "description": "Complete brake inspection and service",
      "price": "150.00",
      "imageUrl": "https://cloudinary.com/image2.jpg"
    }
  }
]
```

**Error Responses:**

- `401` - Unauthorized
- `500` - Failed to fetch saved items

---

### POST /api/saved-items

Save a service to the user's saved items.

**Authentication required**

**Request Body:**

```json
{
  "serviceId": 1
}
```

**Validation Rules:**

- `serviceId`: Required, positive integer

**Success Response (201):**

```json
{
  "id": 1,
  "userId": 1,
  "serviceId": 1,
  "service": {
    "id": 1,
    "name": "Oil Change",
    "description": "Full service oil change with filter replacement",
    "price": "50.00",
    "imageUrl": "https://cloudinary.com/image.jpg"
  }
}
```

**Error Responses:**

- `400` - Validation failed, service already saved, or service not found
- `401` - Unauthorized
- `404` - Service not found
- `500` - Failed to save item

---

### DELETE /api/saved-items/:id

Remove a saved item.

**Authentication required**

**URL Parameters:**

- `id`: Required, positive integer

**Success Response (200):**

```json
{
  "message": "Saved item removed successfully"
}
```

**Error Responses:**

- `400` - Invalid ID format
- `401` - Unauthorized
- `404` - Saved item not found
- `500` - Failed to remove saved item

---

## Error Responses

### Validation Error (400)

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Unauthorized (401)

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid token"
}
```

or

```json
{
  "error": "Token expired"
}
```

### Forbidden (403)

```json
{
  "error": "Admin access required"
}
```

### Not Found (404)

```json
{
  "error": "Service not found"
}
```

### File Upload Error (400)

```json
{
  "error": "File too large. Maximum size is 5MB"
}
```

or

```json
{
  "error": "Only image files are allowed"
}
```

### Internal Server Error (500)

```json
{
  "error": "Internal server error"
}
```

---

## Data Models

### User

```typescript
{
  id: number;
  name: string;
  email: string;
  passwordHash: string; // Never returned in API responses
  role: "user" | "admin";
  themePreference: string; // Default: "light"
}
```

### Service

```typescript
{
  id: number;
  name: string;
  description: string;
  price: string; // Decimal as string, e.g., "50.00"
  imageUrl: string | null;
}
```

### Staff

```typescript
{
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
}
```

### SavedItem

```typescript
{
  id: number;
  userId: number;
  serviceId: number;
  service?: Service; // Included when fetching saved items
}
```

---

## Testing with Postman

### Setting up Authentication

1. **Register or Login** to get a token
2. **Copy the token** from the response
3. **Set Authorization Header:**

   - Go to the **Headers** tab
   - Add header: `Authorization` with value `Bearer <your-token>`

   OR

   - Go to the **Authorization** tab
   - Select type: **Bearer Token**
   - Paste your token

### File Upload Example

For endpoints that accept file uploads (POST/PUT services and staff):

1. Set request method to **POST** or **PUT**
2. Go to **Body** tab
3. Select **form-data**
4. Add fields:
   - Text fields: `name`, `description`, `price`, etc.
   - File field: `image` (select File type, then choose your image)

### Example Collection Structure

```
Bob's Garage API
├── Authentication
│   ├── Register
│   ├── Login
│   └── Get Profile
├── Services
│   ├── Get All Services
│   ├── Create Service (Admin)
│   ├── Update Service (Admin)
│   └── Delete Service (Admin)
├── Staff
│   ├── Get All Staff
│   ├── Create Staff (Admin)
│   ├── Update Staff (Admin)
│   └── Delete Staff (Admin)
└── Saved Items
    ├── Get Saved Items
    ├── Save Item
    └── Remove Saved Item
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use.

---

## CORS Configuration

The API accepts requests from:

- `http://localhost:5173` (default)
- Configured via `CLIENT_URL` environment variable

---

## Environment Variables

Required environment variables:

```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=bobs_garage
JWT_SECRET=your-secret-key-change-this-in-production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

---

## Version

**API Version:** 1.0.0

---

## Support

For issues or questions, please contact the development team.
