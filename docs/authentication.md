# Authentication & Users API

This section covers authentication endpoints and user management operations.

## Overview

Eventra uses JWT (JSON Web Token) based authentication. Users can register, login, and manage their profiles through these endpoints.

## Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "organization": "Tech Corp" // Optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "organization": "Tech Corp",
      "role": "USER",
      "isEmailVerified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "def50200e54b9..."
  },
  "message": "User registered successfully"
}
```

**Validation Rules:**
- Email: Valid email format, unique
- Password: Minimum 8 characters, at least one uppercase, one lowercase, one number
- Name: Required, 2-100 characters

---

### POST /api/auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "lastLoginAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "def50200e54b9...",
    "expiresIn": 3600
  },
  "message": "Login successful"
}
```

---

### POST /api/auth/logout
Logout user and invalidate token.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "refreshToken": "def50200e54b9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### POST /api/auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "def50200e54b9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "new50200e54b9...",
    "expiresIn": 3600
  },
  "message": "Token refreshed successfully"
}
```

---

### GET /api/auth/me
Get current user profile information.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "organization": "Tech Corp",
    "role": "USER",
    "isEmailVerified": true,
    "avatar": "https://example.com/avatars/user1.jpg",
    "preferences": {
      "timezone": "UTC",
      "emailNotifications": true,
      "pushNotifications": false
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T15:45:00Z"
  }
}
```

---

### PUT /api/auth/me
Update current user profile.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "organization": "New Tech Corp",
  "preferences": {
    "timezone": "America/New_York",
    "emailNotifications": false,
    "pushNotifications": true
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Smith",
    "organization": "New Tech Corp",
    "role": "USER",
    "preferences": {
      "timezone": "America/New_York",
      "emailNotifications": false,
      "pushNotifications": true
    },
    "updatedAt": "2024-01-15T16:00:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

### POST /api/auth/change-password
Change user password.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### POST /api/auth/forgot-password
Request password reset link.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### POST /api/auth/reset-password
Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### POST /api/auth/verify-email
Verify email address using verification token.

**Request Body:**
```json
{
  "token": "verification-token-from-email"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### POST /api/auth/resend-verification
Resend email verification link.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification email sent"
}
```

## User Roles

- **USER**: Standard user, can create and manage own events
- **ORGANIZER**: Can manage events for their organization
- **ADMIN**: Can manage users and system settings
- **SUPER_ADMIN**: Full system access

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Invalid email or password |
| `USER_NOT_FOUND` | User account does not exist |
| `EMAIL_ALREADY_EXISTS` | Email is already registered |
| `INVALID_TOKEN` | JWT token is invalid or expired |
| `EMAIL_NOT_VERIFIED` | Email address not verified |
| `WEAK_PASSWORD` | Password doesn't meet security requirements |
| `TOKEN_EXPIRED` | Authentication token has expired |

## Rate Limiting

Authentication endpoints have special rate limiting:
- **Login attempts**: 5 attempts per 15 minutes per IP
- **Registration**: 3 attempts per hour per IP
- **Password reset**: 3 attempts per hour per email

## Security Notes

1. **Token Expiry**: Access tokens expire in 1 hour, refresh tokens in 30 days
2. **Password Requirements**: Minimum 8 characters, mixed case, numbers
3. **Account Lockout**: After 5 failed login attempts, account is locked for 15 minutes
4. **Email Verification**: Required for full account access
5. **Session Management**: Multiple device sessions are supported