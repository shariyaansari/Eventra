# Eventra API Testing Guide with Postman

## Base URL
```
http://localhost:8080
```

## 1. Health Check Endpoints

### Application Health
- **Method**: GET
- **URL**: `http://localhost:8080/api/status/health`
- **Headers**: None required
- **Expected Response**:
```json
{
    "message": "Application is running",
    "status": "UP"
}
```

### Service Status
- **Method**: GET
- **URL**: `http://localhost:8080/status`
- **Headers**: None required
- **Expected Response**:
```json
{
    "service": "Eventra Backend",
    "version": "1.0.0",
    "status": "UP",
    "timestamp": "2025-08-06T17:11:51.4211025"
}
```

## 2. Authentication Endpoints

### User Signup
- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/signup`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "USER"
}
```
- **Expected Success Response**:
```json
{
    "message": "User registered successfully"
}
```

### Organizer Signup
- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/signup`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
```json
{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "password123",
    "role": "ORGANIZER"
}
```

### User Login
- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
- **Expected Success Response**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userId": 1,
    "roles": ["USER"],
    "permissions": ["READ_EVENTS", "REGISTER_EVENTS"]
}
```

## 3. Protected Endpoints Testing

### User Profile (Requires Authentication)
- **Method**: GET
- **URL**: `http://localhost:8080/api/user/profile`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```

### Admin Dashboard (Requires ADMIN role)
- **Method**: GET
- **URL**: `http://localhost:8080/api/admin/dashboard`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```

## 4. Testing Steps in Postman

### Step 1: Test Health Endpoints
1. Create a new request in Postman
2. Set method to GET
3. Enter URL: `http://localhost:8080/api/status/health`
4. Click Send
5. Verify you get status "UP"

### Step 2: Test User Signup
1. Create a new POST request
2. URL: `http://localhost:8080/api/auth/signup`
3. Add header: `Content-Type: application/json`
4. Add the signup JSON body
5. Click Send
6. Should receive success message

### Step 3: Test User Login
1. Create a new POST request
2. URL: `http://localhost:8080/api/auth/login`
3. Add header: `Content-Type: application/json`
4. Add the login JSON body with the same credentials you used for signup
5. Click Send
6. Copy the JWT token from the response

### Step 4: Test Protected Endpoints
1. Create a new GET request
2. URL: `http://localhost:8080/api/user/profile`
3. Add header: `Authorization: Bearer YOUR_JWT_TOKEN` (replace with actual token)
4. Click Send

## 5. Common Error Responses

### 400 Bad Request
```json
{
    "timestamp": "2025-08-06T14:59:56.8210034",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "path": "/api/auth/signup",
    "validationErrors": [
        {
            "field": "email",
            "message": "Email is required"
        }
    ]
}
```

### 401 Unauthorized
```json
{
    "timestamp": "2025-08-06T14:59:56.8210034",
    "status": 401,
    "error": "Unauthorized",
    "message": "Invalid email or password",
    "path": "/api/auth/login"
}
```

### 403 Forbidden
```json
{
    "timestamp": "2025-08-06T14:59:56.8210034",
    "status": 403,
    "error": "Forbidden",
    "message": "Access denied",
    "path": "/api/admin/dashboard"
}
```

## 6. Environment Variables Setup

If you're running locally and want to test with the Railway MySQL database, set these environment variables:

```bash
MYSQLHOST=your_railway_host
MYSQLPORT=3306
MYSQLDATABASE=eventra
MYSQLUSER=root
MYSQLPASSWORD=iiMSBdbPslNXZpUnEjUhrjyVYMcMvynr
```

## 7. Troubleshooting

### Database Connection Issues
- Ensure MySQL service is running
- Check if environment variables are set correctly
- Verify network connectivity to Railway database

### Authentication Issues
- Make sure to include the "Bearer " prefix in Authorization header
- Verify the JWT token hasn't expired
- Check that the user exists in the database

### 500 Internal Server Error
- Check application logs for detailed error messages
- Verify database connectivity
- Ensure all required tables are created
