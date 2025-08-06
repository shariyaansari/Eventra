
## 5. Database Information

Your application uses:
- **H2 In-Memory Database** for development
- **Database Console**: http://localhost:8080/h2-console
- **JDBC URL**: jdbc:h2:mem:testdb
- **Username**: sa
- **Password**: (empty)

## 6. Default Admin Account

The application creates a default admin account:
- **Email**: admin@eventra.com
- **Password**: admin123

You can use this to test admin endpoints.
# How to Test Your Eventra API Endpoints

## 1. Testing Health/Status Endpoints (No Authentication Required)

### Health Check
```
GET http://localhost:8080/health
```

### Status Check  
```
GET http://localhost:8080/status
```

### Database Status
```
GET http://localhost:8080/api/status/database
```

### API Health Status
```
GET http://localhost:8080/api/status/health
```

## 2. Testing Authentication Endpoints

### Signup
```
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## 3. Testing Protected Endpoints (Requires Authentication)

After successful login, you'll receive a JWT token. Use this token in the Authorization header:

### User Profile
```
GET http://localhost:8080/api/user/profile
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### User Events
```
GET http://localhost:8080/api/user/events
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## 4. Postman Testing Instructions

### For Health/Status Endpoints:
1. Create a new GET request
2. Enter the URL (e.g., `http://localhost:8080/health`)
3. Click Send

### For Signup:
1. Create a new POST request to `http://localhost:8080/api/auth/signup`
2. Set Headers: `Content-Type: application/json`
3. In Body, select "raw" and "JSON", then paste the signup JSON
4. Click Send

### For Login:
1. Create a new POST request to `http://localhost:8080/api/auth/login`
2. Set Headers: `Content-Type: application/json`
3. In Body, select "raw" and "JSON", then paste the login JSON
4. Click Send
5. Copy the "token" from the response

### For Protected Endpoints:
1. Create a new GET request to the protected endpoint
2. In Headers, add: `Authorization: Bearer YOUR_TOKEN_HERE`
3. Click Send
