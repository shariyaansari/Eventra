# RSVP & Attendees API

This section covers RSVP management, attendee operations, and waiting list functionality.

## Overview

The RSVP system allows users to register for events, manage their attendance status, and handles capacity management with automatic waitlist functionality.

## RSVP Object

```json
{
  "id": 1,
  "eventId": 1,
  "userId": 1,
  "status": "confirmed",
  "ticketTierId": 1,
  "ticketTier": {
    "id": 1,
    "name": "General Admission",
    "price": 99.99
  },
  "responseDate": "2024-10-15T10:30:00Z",
  "checkedIn": false,
  "checkedInAt": null,
  "qrCode": "EVT001-USR001-TIK001",
  "specialRequests": "Vegetarian meal preference",
  "additionalData": {
    "dietaryRestrictions": ["vegetarian"],
    "accessibilityNeeds": [],
    "emergencyContact": {
      "name": "Jane Doe",
      "phone": "+1-555-0123"
    }
  },
  "paymentStatus": "paid",
  "paymentId": "pay_1234567890",
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Endpoints

### POST /api/events/{eventId}/rsvp
Register for an event (RSVP).

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "ticketTierId": 1,
  "specialRequests": "Vegetarian meal preference",
  "additionalData": {
    "dietaryRestrictions": ["vegetarian"],
    "accessibilityNeeds": [],
    "emergencyContact": {
      "name": "Jane Doe",
      "phone": "+1-555-0123"
    }
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "rsvp": {
      // Complete RSVP object
    },
    "position": 1, // Position in queue if waitlisted
    "estimatedWaitTime": null // Estimated wait time if waitlisted
  },
  "message": "RSVP registered successfully"
}
```

---

### GET /api/events/{eventId}/rsvp
Get current user's RSVP status for an event.

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
    // RSVP object or null if not registered
  }
}
```

---

### PUT /api/events/{eventId}/rsvp
Update RSVP details.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "specialRequests": "Updated dietary requirements",
  "additionalData": {
    "dietaryRestrictions": ["vegetarian", "gluten-free"]
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated RSVP object
  },
  "message": "RSVP updated successfully"
}
```

---

### DELETE /api/events/{eventId}/rsvp
Cancel RSVP (unregister from event).

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
  "message": "RSVP cancelled successfully"
}
```

---

### GET /api/rsvps
Get user's RSVP history.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20)
- `status` (string): Filter by status (confirmed, pending, declined, waitlist, cancelled)
- `upcoming` (boolean): Filter for upcoming events only
- `sort` (string): Sort field (eventDate, responseDate)
- `order` (string): Sort order (asc, desc)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "rsvps": [
      {
        "id": 1,
        "event": {
          "id": 1,
          "title": "Tech Conference 2024",
          "startDate": "2024-12-01T09:00:00Z",
          "location": { "name": "Convention Center" }
        },
        "status": "confirmed",
        "ticketTier": { "name": "General Admission" },
        "responseDate": "2024-10-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15
    }
  }
}
```

---

### GET /api/events/{eventId}/waitlist
Get event waitlist information.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "waitlist": [
      {
        "id": 1,
        "user": {
          "id": 1,
          "name": "John Smith",
          "email": "john@example.com"
        },
        "position": 1,
        "joinedAt": "2024-10-20T14:30:00Z",
        "estimatedWaitTime": "2-3 days",
        "ticketTier": { "name": "General Admission" }
      }
    ],
    "stats": {
      "totalWaitlisted": 25,
      "averageWaitTime": "3 days",
      "conversionRate": 0.85
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25
    }
  }
}
```

---

### POST /api/events/{eventId}/waitlist/notify
Notify waitlisted users about available spots.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "availableSpots": 5,
  "notificationMessage": "Good news! Spots are now available for the event.",
  "expirationHours": 24 // How long users have to claim their spot
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notifiedUsers": 5,
    "notificationsSent": 5,
    "expiresAt": "2024-10-21T14:30:00Z"
  },
  "message": "Waitlist notifications sent successfully"
}
```

---

### GET /api/events/{eventId}/attendees/export
Export attendees list to CSV.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `format` (string): Export format (csv, xlsx, pdf)
- `fields` (array): Fields to include (name, email, ticketTier, checkedIn, etc.)
- `status` (string): Filter by RSVP status

**Response (200 OK):**
```http
Content-Type: text/csv
Content-Disposition: attachment; filename="event-attendees-2024-01-15.csv"

Name,Email,Ticket Tier,RSVP Status,Checked In,Registration Date
John Doe,john@example.com,General Admission,confirmed,true,2024-10-15
Jane Smith,jane@example.com,VIP,confirmed,false,2024-10-16
```

---

### POST /api/events/{eventId}/attendees/import
Import attendees from CSV file.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```
file: attendees.csv
ticketTierId: 1
sendNotifications: true
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "imported": 45,
    "skipped": 2,
    "errors": 1,
    "details": {
      "duplicates": ["john@example.com"],
      "invalidEmails": ["invalid-email"],
      "capacityExceeded": false
    }
  },
  "message": "Attendees imported successfully"
}
```

---

### GET /api/events/{eventId}/capacity
Get event capacity and availability information.

**Path Parameters:**
- `eventId` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalCapacity": 500,
    "availableSpots": 255,
    "confirmedAttendees": 230,
    "pendingRSVPs": 15,
    "waitlistCount": 25,
    "ticketTiers": [
      {
        "id": 1,
        "name": "General Admission",
        "capacity": 400,
        "sold": 180,
        "available": 220,
        "waitlisted": 15
      },
      {
        "id": 2,
        "name": "VIP",
        "capacity": 100,
        "sold": 50,
        "available": 50,
        "waitlisted": 10
      }
    ],
    "isWaitlistEnabled": true,
    "registrationStatus": "open"
  }
}
```

## RSVP Status Values

- `confirmed` - User confirmed attendance
- `pending` - Awaiting user confirmation (for events requiring approval)
- `declined` - User declined invitation
- `waitlist` - User is on waiting list
- `cancelled` - User cancelled their RSVP
- `expired` - RSVP opportunity expired

## Payment Status Values

- `pending` - Payment not yet processed
- `paid` - Payment completed successfully
- `failed` - Payment failed
- `refunded` - Payment was refunded
- `partial` - Partial payment received

## Waitlist Management

The waitlist system automatically:

1. **Adds users to waitlist** when event reaches capacity
2. **Promotes users** when spots become available
3. **Sends notifications** to waitlisted users about available spots
4. **Manages timeouts** for spot claims (default 24 hours)
5. **Tracks analytics** for waitlist conversion rates

## Capacity Management Rules

1. **Overbooking**: Events can optionally allow overbooking (10% default)
2. **Tier limits**: Each ticket tier has individual capacity limits
3. **Auto-promotion**: Waitlisted users are automatically promoted when spots open
4. **Grace period**: Cancelled RSVPs have a grace period before spot is released

## Notification Types

- **RSVP confirmed**: Welcome email with event details
- **Waitlist joined**: Confirmation of waitlist position
- **Spot available**: Notification when spot opens up
- **Payment reminder**: For paid events with pending payment
- **Event reminders**: Scheduled reminders before event
- **Check-in reminder**: Day-of-event check-in instructions

## Error Codes

| Code | Description |
|------|-------------|
| `EVENT_FULL` | Event has reached capacity |
| `ALREADY_REGISTERED` | User already has RSVP for this event |
| `REGISTRATION_CLOSED` | Registration period has ended |
| `INVALID_TICKET_TIER` | Selected ticket tier is invalid |
| `PAYMENT_REQUIRED` | Payment is required for this event |
| `APPROVAL_REQUIRED` | Event requires organizer approval |
| `RSVP_NOT_FOUND` | RSVP record does not exist |
| `WAITLIST_FULL` | Waitlist has reached maximum capacity |
| `INSUFFICIENT_SPOTS` | Not enough spots available for group registration |