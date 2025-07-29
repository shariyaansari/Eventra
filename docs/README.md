# Eventra API Documentation

Welcome to the Eventra API documentation. This comprehensive guide covers all API endpoints for the Eventra event management system.

## Overview

Eventra provides a RESTful API for managing events, attendees, RSVPs, check-ins, and analytics. The API is built with Spring Boot and uses JWT authentication for secure access.

## Base URL

```
Production: https://api.eventra.com
Development: http://localhost:8080
```

## Authentication

All API endpoints (except public registration and login) require authentication using JWT tokens.

### Headers

```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## API Documentation Sections

1. [Authentication & Users](./authentication.md) - Login, registration, and user management
2. [Events](./events.md) - Event creation, management, and operations
3. [RSVP & Attendees](./rsvp-attendees.md) - RSVP management and attendee operations
4. [Check-in](./checkin.md) - QR code generation and check-in processes
5. [Dashboards & Analytics](./dashboards.md) - Analytics and reporting endpoints
6. [Feedback & Surveys](./feedback.md) - Post-event feedback and survey management
7. [Admin](./admin.md) - Administrative operations and system management
8. [Error Codes](./errors.md) - Complete error code reference
9. [OpenAPI Specification](./openapi.yaml) - Machine-readable API specification

## Quick Start

1. **Register a new user**
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password","name":"John Doe"}'
   ```

2. **Login and get token**
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password"}'
   ```

3. **Create an event**
   ```bash
   curl -X POST http://localhost:8080/api/events \
     -H "Authorization: Bearer <your-token>" \
     -H "Content-Type: application/json" \
     -d '{"title":"My Event","description":"Event description","startDate":"2024-12-01T10:00:00Z"}'
   ```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": ["Email is required", "Password must be at least 8 characters"]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:

- **Authenticated users**: 1000 requests per hour
- **Anonymous users**: 100 requests per hour

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination using query parameters:

```http
GET /api/events?page=1&limit=20&sort=createdAt&order=desc
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## Versioning

The API uses URL path versioning:

```
/api/v1/events  (Current version)
/api/v2/events  (Future version)
```

Current API version: **v1**

## Support

For API support and questions:
- 📧 Email: api-support@eventra.com
- 💬 Discord: [Eventra Community](https://discord.gg/eventra)
- 🐛 Issues: [GitHub Issues](https://github.com/SandeepVashishtha/Eventra/issues)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for API version history and changes.