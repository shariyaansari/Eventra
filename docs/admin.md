# Admin API

This section covers administrative operations, system management, user administration, and platform-wide controls.

## Overview

The Admin API provides comprehensive administrative functionality for managing users, organizations, system settings, and platform-wide operations with role-based access control.

## Admin User Object

```json
{
  "id": 1,
  "email": "admin@eventra.com",
  "name": "System Administrator",
  "role": "SUPER_ADMIN",
  "permissions": [
    "manage_users",
    "manage_organizations",
    "system_settings",
    "view_platform_analytics",
    "manage_billing"
  ],
  "organization": {
    "id": 1,
    "name": "Eventra Platform",
    "type": "PLATFORM"
  },
  "lastLoginAt": "2024-01-15T10:30:00Z",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "metadata": {
    "loginCount": 245,
    "lastIpAddress": "192.168.1.100",
    "twoFactorEnabled": true
  }
}
```

## User Management

### GET /api/admin/users
Get list of all users with advanced filtering.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `role` (string): Filter by user role
- `status` (string): Filter by status (active, inactive, suspended)
- `organization` (integer): Filter by organization ID
- `search` (string): Search by name, email, or organization
- `sort` (string): Sort field (name, email, createdAt, lastLoginAt)
- `order` (string): Sort order (asc, desc)
- `registeredAfter` (string): Filter users registered after date
- `lastLoginBefore` (string): Filter users who haven't logged in since date

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "role": "USER",
        "organization": {
          "id": 2,
          "name": "Tech Corp"
        },
        "isActive": true,
        "lastLoginAt": "2024-01-15T10:30:00Z",
        "eventsCreated": 5,
        "eventsAttended": 12,
        "createdAt": "2024-01-01T10:00:00Z"
      }
    ],
    "summary": {
      "totalUsers": 2450,
      "activeUsers": 2380,
      "inactiveUsers": 70,
      "newUsersThisMonth": 145
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 2450,
      "totalPages": 123
    }
  }
}
```

---

### GET /api/admin/users/{userId}
Get detailed user information.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `userId` (integer): User ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      // Complete user object with admin fields
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "isActive": true,
      "isEmailVerified": true,
      "organization": {
        "id": 2,
        "name": "Tech Corp"
      },
      "profile": {
        "avatar": "https://example.com/avatars/user1.jpg",
        "bio": "Software developer passionate about events",
        "location": "New York, NY",
        "website": "https://johndoe.dev"
      },
      "statistics": {
        "eventsCreated": 5,
        "eventsAttended": 12,
        "rsvpsConfirmed": 15,
        "rsvpsCancelled": 2,
        "averageRating": 4.3,
        "totalRevenue": 2450.00
      },
      "activity": {
        "lastLoginAt": "2024-01-15T10:30:00Z",
        "loginCount": 245,
        "lastIpAddress": "192.168.1.100",
        "deviceInfo": "Chrome on macOS"
      },
      "security": {
        "twoFactorEnabled": true,
        "passwordLastChanged": "2024-01-01T00:00:00Z",
        "accountLocked": false,
        "failedLoginAttempts": 0
      },
      "billing": {
        "totalPaid": 2450.00,
        "totalRefunded": 150.00,
        "outstandingBalance": 0.00,
        "paymentMethods": 2
      }
    },
    "auditLog": [
      {
        "action": "LOGIN",
        "timestamp": "2024-01-15T10:30:00Z",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0..."
      }
    ]
  }
}
```

---

### PUT /api/admin/users/{userId}
Update user information and settings.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `userId` (integer): User ID

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "ORGANIZER",
  "isActive": true,
  "organizationId": 2,
  "permissions": ["create_events", "manage_attendees"],
  "notes": "Promoted to organizer role",
  "sendNotification": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated user object
  },
  "message": "User updated successfully"
}
```

---

### POST /api/admin/users/{userId}/suspend
Suspend user account.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `userId` (integer): User ID

**Request Body:**
```json
{
  "reason": "Terms of service violation",
  "duration": 30, // days, null for indefinite
  "notifyUser": true,
  "revokeTokens": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "suspendedUntil": "2024-02-15T10:30:00Z",
    "reason": "Terms of service violation"
  },
  "message": "User suspended successfully"
}
```

---

### POST /api/admin/users/{userId}/reactivate
Reactivate suspended user account.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `userId` (integer): User ID

**Request Body:**
```json
{
  "reason": "Appeal approved",
  "sendWelcomeBack": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User reactivated successfully"
}
```

## Organization Management

### GET /api/admin/organizations
Get list of all organizations.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `type` (string): Filter by organization type
- `status` (string): Filter by status
- `search` (string): Search by name or domain

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": 1,
        "name": "Tech Corp",
        "domain": "techcorp.com",
        "type": "ENTERPRISE",
        "status": "ACTIVE",
        "plan": "PREMIUM",
        "userCount": 245,
        "eventCount": 58,
        "monthlyRevenue": 4500.00,
        "createdAt": "2024-01-01T00:00:00Z",
        "billing": {
          "nextBillingDate": "2024-02-01T00:00:00Z",
          "status": "CURRENT"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150
    }
  }
}
```

---

### POST /api/admin/organizations
Create new organization.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "name": "New Company",
  "domain": "newcompany.com",
  "type": "BUSINESS",
  "plan": "STANDARD",
  "adminEmail": "admin@newcompany.com",
  "settings": {
    "maxUsers": 100,
    "maxEventsPerMonth": 50,
    "customBranding": true
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    // Complete organization object
  },
  "message": "Organization created successfully"
}
```

## System Settings

### GET /api/admin/settings
Get system-wide settings.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "platform": {
      "name": "Eventra",
      "version": "1.2.0",
      "environment": "production",
      "maintenanceMode": false,
      "allowRegistrations": true,
      "requireEmailVerification": true
    },
    "features": {
      "paymentProcessing": true,
      "videoStreaming": false,
      "aiRecommendations": true,
      "socialIntegration": true
    },
    "limits": {
      "maxUsersPerOrganization": 1000,
      "maxEventsPerUser": 50,
      "maxAttendeesPerEvent": 10000,
      "fileUploadSizeMB": 100
    },
    "email": {
      "provider": "sendgrid",
      "fromAddress": "noreply@eventra.com",
      "fromName": "Eventra",
      "templatesEnabled": true
    },
    "security": {
      "sessionTimeoutHours": 24,
      "passwordExpiryDays": 90,
      "mfaRequired": false,
      "apiRateLimit": 1000
    }
  }
}
```

---

### PUT /api/admin/settings
Update system settings.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "platform": {
    "maintenanceMode": true,
    "allowRegistrations": false
  },
  "features": {
    "videoStreaming": true
  },
  "limits": {
    "maxUsersPerOrganization": 1500
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated settings object
  },
  "message": "Settings updated successfully"
}
```

## Platform Analytics

### GET /api/admin/analytics/platform
Get platform-wide analytics and metrics.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters:**
- `timeframe` (string): Time period (7d, 30d, 90d, 1y)
- `metrics` (array): Specific metrics to include

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 12450,
      "activeUsers": 8900,
      "totalOrganizations": 150,
      "totalEvents": 2450,
      "totalRevenue": 125000.00,
      "growthRate": 15.2
    },
    "userMetrics": {
      "newRegistrations": 245,
      "dailyActiveUsers": 1890,
      "monthlyActiveUsers": 8900,
      "churnRate": 2.1,
      "retentionRate": 85.6
    },
    "eventMetrics": {
      "eventsCreated": 89,
      "eventsCompleted": 72,
      "averageAttendance": 45.6,
      "popularCategories": [
        {
          "category": "CONFERENCE",
          "count": 234,
          "percentage": 35.2
        }
      ]
    },
    "revenueMetrics": {
      "totalRevenue": 125000.00,
      "monthlyRecurringRevenue": 25000.00,
      "averageRevenuePerUser": 14.05,
      "revenueGrowth": 18.7
    },
    "systemMetrics": {
      "apiRequestsPerDay": 450000,
      "averageResponseTime": 150, // milliseconds
      "uptime": 99.9,
      "errorRate": 0.02
    }
  }
}
```

## Content Moderation

### GET /api/admin/moderation/reports
Get content moderation reports.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters:**
- `status` (string): Filter by status (pending, resolved, dismissed)
- `type` (string): Filter by content type (event, comment, user)
- `severity` (string): Filter by severity (low, medium, high, critical)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": 1,
        "contentType": "EVENT",
        "contentId": 123,
        "reason": "INAPPROPRIATE_CONTENT",
        "description": "Event contains offensive language",
        "reportedBy": {
          "id": 456,
          "name": "User Reporter"
        },
        "severity": "MEDIUM",
        "status": "PENDING",
        "createdAt": "2024-01-15T10:30:00Z",
        "content": {
          "title": "Problematic Event",
          "excerpt": "..."
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45
    }
  }
}
```

---

### POST /api/admin/moderation/reports/{reportId}/resolve
Resolve moderation report.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Path Parameters:**
- `reportId` (integer): Report ID

**Request Body:**
```json
{
  "action": "CONTENT_REMOVED", // CONTENT_REMOVED, USER_WARNED, NO_ACTION, USER_SUSPENDED
  "reason": "Content violated community guidelines",
  "notifyReporter": true,
  "notifyContentOwner": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Report resolved successfully"
}
```

## System Health

### GET /api/admin/system/health
Get system health status.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overall": "HEALTHY", // HEALTHY, DEGRADED, CRITICAL
    "services": [
      {
        "name": "API Server",
        "status": "HEALTHY",
        "responseTime": 45, // milliseconds
        "uptime": 99.9,
        "lastCheck": "2024-01-15T10:30:00Z"
      },
      {
        "name": "Database",
        "status": "HEALTHY",
        "connections": 45,
        "maxConnections": 200,
        "queryTime": 12
      },
      {
        "name": "Email Service",
        "status": "DEGRADED",
        "deliveryRate": 95.2,
        "queueLength": 125
      }
    ],
    "metrics": {
      "cpuUsage": 45.2,
      "memoryUsage": 62.8,
      "diskUsage": 78.5,
      "networkLatency": 15
    },
    "alerts": [
      {
        "type": "WARNING",
        "service": "Email Service",
        "message": "Delivery rate below threshold",
        "timestamp": "2024-01-15T10:25:00Z"
      }
    ]
  }
}
```

## Audit Logs

### GET /api/admin/audit-logs
Get system audit logs.

**Headers:**
```http
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters:**
- `action` (string): Filter by action type
- `userId` (integer): Filter by user
- `resource` (string): Filter by resource type
- `startDate` (string): Start date for logs
- `endDate` (string): End date for logs
- `severity` (string): Filter by severity level

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": 1,
        "action": "USER_CREATED",
        "resource": "USER",
        "resourceId": 123,
        "actor": {
          "id": 1,
          "name": "Admin User",
          "role": "ADMIN"
        },
        "details": {
          "userEmail": "newuser@example.com",
          "userRole": "USER"
        },
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0...",
        "severity": "INFO",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 5420
    }
  }
}
```

## Admin Roles and Permissions

### SUPER_ADMIN
- Full system access
- Manage platform settings
- Create/delete organizations
- Access all data and analytics
- System maintenance operations

### ADMIN
- Manage users within organization
- View organization analytics
- Moderate content
- Manage organization settings
- Access audit logs

### MODERATOR
- Content moderation
- User support
- Basic analytics access
- Handle user reports

## Security Features

- **Role-based access control**: Granular permissions system
- **Audit logging**: Complete audit trail of admin actions
- **Two-factor authentication**: Required for admin accounts
- **IP restrictions**: Limit admin access to specific IP ranges
- **Session management**: Enhanced session security for admin accounts
- **Activity monitoring**: Real-time monitoring of admin activities

## Error Codes

| Code | Description |
|------|-------------|
| `INSUFFICIENT_ADMIN_PERMISSIONS` | User lacks required admin permissions |
| `ORGANIZATION_NOT_FOUND` | Organization does not exist |
| `USER_CANNOT_BE_SUSPENDED` | User cannot be suspended (e.g., last admin) |
| `SETTING_VALIDATION_FAILED` | System setting value is invalid |
| `MAINTENANCE_MODE_ACTIVE` | System is in maintenance mode |
| `AUDIT_LOG_ACCESS_DENIED` | User cannot access audit logs |
| `SYSTEM_HEALTH_CHECK_FAILED` | Health check service unavailable |