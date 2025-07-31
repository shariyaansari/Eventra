# Check-in API

This section covers QR code generation, check-in processes, and attendee tracking functionality.

## Overview

The check-in system provides QR code-based attendance tracking with mobile scanning capabilities and offline fallback support for seamless event management.

## Check-in Object

```json
{
  "id": 1,
  "eventId": 1,
  "userId": 1,
  "rsvpId": 1,
  "qrCode": "EVT001-USR001-CHK001",
  "qrCodeData": {
    "eventId": 1,
    "userId": 1,
    "rsvpId": 1,
    "checksum": "abc123",
    "expiresAt": "2024-12-01T23:59:59Z"
  },
  "checkedIn": true,
  "checkedInAt": "2024-12-01T08:45:00Z",
  "checkedInBy": {
    "id": 2,
    "name": "Staff Member",
    "role": "STAFF"
  },
  "checkInMethod": "QR_SCAN", // QR_SCAN, MANUAL, BULK
  "location": "Main Entrance",
  "deviceId": "scanner-001",
  "notes": "VIP guest, special seating",
  "validated": true,
  "validationErrors": [],
  "metadata": {
    "scanDuration": 1.2, // seconds
    "scanAttempts": 1,
    "ipAddress": "192.168.1.100"
  }
}
```

## Endpoints

### GET /api/events/{eventId}/checkin/qr/{userId}
Generate QR code for specific user's event check-in.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID
- `userId` (integer): User ID (optional, defaults to current user)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "qrCode": "EVT001-USR001-CHK001",
    "qrCodeImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "qrCodeUrl": "https://api.eventra.com/checkin/EVT001-USR001-CHK001",
    "expiresAt": "2024-12-01T23:59:59Z",
    "rsvp": {
      "id": 1,
      "status": "confirmed",
      "ticketTier": "General Admission"
    }
  }
}
```

---

### POST /api/events/{eventId}/checkin/scan
Scan QR code and check in attendee.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "qrCode": "EVT001-USR001-CHK001",
  "location": "Main Entrance",
  "deviceId": "scanner-001",
  "notes": "VIP guest, special seating"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "checkIn": {
      // Complete check-in object
    },
    "attendee": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "ticketTier": "General Admission",
      "specialRequests": "Vegetarian meal"
    },
    "firstTimeCheckIn": true
  },
  "message": "Check-in successful"
}
```

**Error Response (400 Bad Request) - Already Checked In:**
```json
{
  "success": false,
  "error": {
    "code": "ALREADY_CHECKED_IN",
    "message": "User is already checked in",
    "details": {
      "checkedInAt": "2024-12-01T08:30:00Z",
      "checkedInBy": "Staff Member"
    }
  }
}
```

---

### POST /api/events/{eventId}/checkin/manual
Manually check in attendee (fallback for QR issues).

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "identifier": "john@example.com", // Email, phone, or name
  "location": "Main Entrance",
  "reason": "QR code not working",
  "notes": "Manual check-in due to technical issues"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "checkIn": {
      // Check-in object
    },
    "attendee": {
      // Attendee details
    },
    "matchedBy": "email" // How attendee was identified
  },
  "message": "Manual check-in successful"
}
```

---

### GET /api/events/{eventId}/checkin/stats
Get real-time check-in statistics.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalExpected": 245,
      "checkedIn": 180,
      "checkInRate": 73.5,
      "noShows": 65,
      "walkIns": 5
    },
    "timeline": [
      {
        "hour": "08:00",
        "checkedIn": 15,
        "cumulative": 15
      },
      {
        "hour": "09:00",
        "checkedIn": 45,
        "cumulative": 60
      }
    ],
    "byTicketTier": [
      {
        "tierName": "General Admission",
        "expected": 180,
        "checkedIn": 135,
        "rate": 75.0
      },
      {
        "tierName": "VIP",
        "expected": 65,
        "checkedIn": 45,
        "rate": 69.2
      }
    ],
    "byLocation": [
      {
        "location": "Main Entrance",
        "checkedIn": 120,
        "percentage": 66.7
      },
      {
        "location": "VIP Entrance",
        "checkedIn": 60,
        "percentage": 33.3
      }
    ]
  }
}
```

---

### GET /api/events/{eventId}/checkin/list
Get list of checked-in attendees.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `location` (string): Filter by check-in location
- `timeFrom` (string): Filter check-ins from this time
- `timeTo` (string): Filter check-ins until this time
- `search` (string): Search by attendee name or email

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "checkIns": [
      {
        "id": 1,
        "attendee": {
          "name": "John Doe",
          "email": "john@example.com",
          "ticketTier": "General Admission"
        },
        "checkedInAt": "2024-12-01T08:45:00Z",
        "location": "Main Entrance",
        "checkedInBy": "Staff Member",
        "method": "QR_SCAN"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 180
    }
  }
}
```

---

### POST /api/events/{eventId}/checkin/bulk
Bulk check-in multiple attendees.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "attendees": [
    {
      "identifier": "john@example.com",
      "location": "Main Entrance"
    },
    {
      "identifier": "jane@example.com",
      "location": "Main Entrance"
    }
  ],
  "reason": "Pre-registration check-in",
  "notes": "Bulk check-in for pre-registered attendees"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "successful": 8,
    "failed": 2,
    "results": [
      {
        "identifier": "john@example.com",
        "success": true,
        "checkIn": {
          // Check-in object
        }
      },
      {
        "identifier": "unknown@example.com",
        "success": false,
        "error": "Attendee not found"
      }
    ]
  },
  "message": "Bulk check-in completed"
}
```

---

### DELETE /api/events/{eventId}/checkin/{userId}
Undo check-in (check out attendee).

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID
- `userId` (integer): User ID

**Request Body:**
```json
{
  "reason": "Left early due to emergency",
  "notes": "Family emergency, left at 2 PM"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Check-in undone successfully"
}
```

---

### GET /api/events/{eventId}/checkin/export
Export check-in data to various formats.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `format` (string): Export format (csv, xlsx, pdf)
- `timeFrom` (string): Start time for export
- `timeTo` (string): End time for export
- `includeNoShows` (boolean): Include attendees who didn't check in

**Response (200 OK):**
```http
Content-Type: text/csv
Content-Disposition: attachment; filename="checkin-report-2024-12-01.csv"

Name,Email,Ticket Tier,Checked In,Check-in Time,Location,Staff Member
John Doe,john@example.com,General Admission,Yes,2024-12-01 08:45:00,Main Entrance,Staff Member
Jane Smith,jane@example.com,VIP,Yes,2024-12-01 08:50:00,VIP Entrance,Staff Member
Bob Johnson,bob@example.com,General Admission,No,,,
```

---

### GET /api/events/{eventId}/checkin/devices
Get list of check-in devices and their status.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "deviceId": "scanner-001",
        "name": "Main Entrance Scanner",
        "location": "Main Entrance",
        "status": "online",
        "lastSeen": "2024-12-01T09:00:00Z",
        "checkInsToday": 85,
        "operator": {
          "id": 2,
          "name": "Staff Member"
        },
        "batteryLevel": 78,
        "networkStrength": "strong"
      }
    ],
    "summary": {
      "totalDevices": 3,
      "onlineDevices": 2,
      "offlineDevices": 1,
      "totalCheckIns": 180
    }
  }
}
```

## QR Code Format

QR codes contain encrypted data with the following structure:

```json
{
  "eventId": 1,
  "userId": 1,
  "rsvpId": 1,
  "timestamp": 1640995200,
  "checksum": "abc123def456",
  "version": "v1"
}
```

## Check-in Methods

- **QR_SCAN**: Standard QR code scanning
- **MANUAL**: Manual check-in by staff
- **BULK**: Bulk check-in operation
- **WALK_IN**: Walk-in attendee (no prior registration)
- **AUTO**: Automated check-in (geo-fence, NFC, etc.)

## Device Types

- **MOBILE_APP**: Staff mobile app scanner
- **TABLET**: Dedicated tablet scanner
- **KIOSK**: Self-service kiosk
- **HARDWARE**: Dedicated hardware scanner
- **WEB**: Web-based scanner

## Offline Support

The check-in system supports offline operation:

1. **Cache attendee list** on device
2. **Store check-ins locally** when offline
3. **Sync when connection restored**
4. **Conflict resolution** for duplicate check-ins
5. **Offline QR validation** using cached data

## Security Features

- **QR code encryption**: All QR codes are encrypted and time-limited
- **Device authentication**: Check-in devices must be authorized
- **Audit logging**: All check-in actions are logged
- **Rate limiting**: Prevents rapid-fire scanning abuse
- **Duplicate detection**: Prevents multiple check-ins
- **Staff permissions**: Role-based access to check-in functions

## Real-time Updates

Check-in data is updated in real-time using WebSocket connections:

```javascript
// WebSocket endpoint for real-time check-in updates
wss://api.eventra.com/events/1/checkin/stream

// Message format
{
  "type": "CHECKIN_SUCCESS",
  "data": {
    "attendee": { /* attendee data */ },
    "checkIn": { /* check-in data */ },
    "stats": { /* updated stats */ }
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_QR_CODE` | QR code is invalid or corrupted |
| `EXPIRED_QR_CODE` | QR code has expired |
| `ALREADY_CHECKED_IN` | Attendee is already checked in |
| `ATTENDEE_NOT_FOUND` | Attendee not found for this event |
| `INVALID_RSVP_STATUS` | RSVP status doesn't allow check-in |
| `DEVICE_NOT_AUTHORIZED` | Check-in device is not authorized |
| `EVENT_NOT_STARTED` | Event hasn't started yet |
| `EVENT_ENDED` | Event has already ended |
| `LOCATION_MISMATCH` | Check-in location doesn't match ticket |
| `DUPLICATE_SCAN` | Same QR code scanned multiple times |