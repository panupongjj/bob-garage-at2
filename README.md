# Bob Garage AT2

A client-server application project for Bob's Garage service management system.

## Project Structure

```
bob_garage_at2/
├── server/     # Server-side code (Node.js/Express API)
├── client/     # Client-side code
├── API_DOCUMENTATION.md  # Complete API documentation
└── Bob_Garage_API.postman_collection.json  # Postman collection for testing
```

## Getting Started

### Server

Navigate to the `server` directory and follow the setup instructions.

**Quick Start:**

```bash
cd server
npm install
npm run dev
```

The server will run on `http://localhost:3001`

### Client

Navigate to the `client` directory and follow the setup instructions.

## API Documentation

Complete API documentation is available in [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md).

### Quick Links

- **Base URL:** `http://localhost:3001/api`
- **Health Check:** `GET /api/health`
- **Authentication:** Bearer token required for most endpoints
- **Admin Access:** Required for create/update/delete operations

### Postman Collection

Import [`Bob_Garage_API.postman_collection.json`](./Bob_Garage_API.postman_collection.json) into Postman for easy API testing.

**Setup:**

1. Import the collection into Postman
2. Set the `base_url` variable to `http://localhost:3001`
3. Use the Login endpoint to get a token (automatically saved to `auth_token` variable)
4. All other requests will use the token automatically

### API Endpoints Overview

- **Authentication:** `/api/auth` - Register, login, get profile
- **Services:** `/api/services` - CRUD operations for services
- **Staff:** `/api/staff` - CRUD operations for staff members
- **Saved Items:** `/api/saved-items` - Manage user's saved services

For detailed endpoint documentation, request/response examples, and validation rules, see [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md).
