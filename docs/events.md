# Events API

This section covers event management operations including creating, updating, and managing events.

## Overview

Events are the core entity in Eventra. Users can create one-time or recurring events, set capacities, manage ticket tiers, and configure registration windows.

## Event Object

```json
{
  "id": 1,
  "title": "Tech Conference 2024",
  "description": "Annual technology conference featuring latest innovations",
  "slug": "tech-conference-2024",
  "startDate": "2024-12-01T09:00:00Z",
  "endDate": "2024-12-01T18:00:00Z",
  "timezone": "America/New_York",
  "location": {
    "name": "Convention Center",
    "address": "123 Main St, New York, NY 10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "isVirtual": false,
  "virtualLink": null,
  "capacity": 500,
  "isPublic": true,
  "requiresApproval": false,
  "registrationOpen": true,
  "registrationStart": "2024-10-01T00:00:00Z",
  "registrationEnd": "2024-11-30T23:59:59Z",
  "category": "CONFERENCE",
  "tags": ["technology", "innovation", "networking"],
  "ticketTiers": [
    {
      "id": 1,
      "name": "General Admission",
      "price": 99.99,
      "capacity": 400,
      "description": "Standard conference access"
    },
    {
      "id": 2,
      "name": "VIP",
      "price": 199.99,
      "capacity": 100,
      "description": "VIP access with premium benefits"
    }
  ],
  "organizer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Tech Corp"
  },
  "stats": {
    "totalRSVPs": 245,
    "confirmedAttendees": 230,
    "checkedIn": 180,
    "waitlistCount": 15
  },
  "isRecurring": false,
  "recurrencePattern": null,
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T14:22:00Z"
}
```

## Endpoints

### GET /api/events
Get list of events with filtering and pagination.

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `sort` (string): Sort field (title, startDate, createdAt, updatedAt)
- `order` (string): Sort order (asc, desc)
- `category` (string): Filter by event category
- `location` (string): Filter by location/city
- `startDate` (string): Filter events starting from this date (ISO 8601)
- `endDate` (string): Filter events ending before this date (ISO 8601)
- `isPublic` (boolean): Filter by public/private events
- `search` (string): Search in title and description

**Example Request:**
```bash
GET /api/events?page=1&limit=10&category=CONFERENCE&isPublic=true&sort=startDate&order=asc
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        // Event object (abbreviated)
        "id": 1,
        "title": "Tech Conference 2024",
        "startDate": "2024-12-01T09:00:00Z",
        "location": { "name": "Convention Center" },
        "capacity": 500,
        "stats": { "totalRSVPs": 245 }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### GET /api/events/{id}
Get specific event details.

**Path Parameters:**
- `id` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Complete event object
  }
}
```

---

### POST /api/events
Create a new event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference featuring latest innovations",
  "startDate": "2024-12-01T09:00:00Z",
  "endDate": "2024-12-01T18:00:00Z",
  "timezone": "America/New_York",
  "location": {
    "name": "Convention Center",
    "address": "123 Main St, New York, NY 10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "isVirtual": false,
  "virtualLink": null,
  "capacity": 500,
  "isPublic": true,
  "requiresApproval": false,
  "registrationStart": "2024-10-01T00:00:00Z",
  "registrationEnd": "2024-11-30T23:59:59Z",
  "category": "CONFERENCE",
  "tags": ["technology", "innovation"],
  "ticketTiers": [
    {
      "name": "General Admission",
      "price": 99.99,
      "capacity": 400,
      "description": "Standard conference access"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    // Complete event object with generated ID
  },
  "message": "Event created successfully"
}
```

---

### PUT /api/events/{id}
Update an existing event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `id` (integer): Event ID

**Request Body:** (Same as POST, all fields optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated event object
  },
  "message": "Event updated successfully"
}
```

---

### DELETE /api/events/{id}
Delete an event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `id` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

### POST /api/events/{id}/duplicate
Duplicate an existing event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `id` (integer): Event ID to duplicate

**Request Body:**
```json
{
  "title": "Tech Conference 2025",
  "startDate": "2025-12-01T09:00:00Z",
  "endDate": "2025-12-01T18:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    // Duplicated event object
  },
  "message": "Event duplicated successfully"
}
```

---

### GET /api/events/{id}/attendees
Get list of event attendees.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `id` (integer): Event ID

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `status` (string): Filter by RSVP status (confirmed, pending, declined, waitlist)
- `checkedIn` (boolean): Filter by check-in status

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "attendees": [
      {
        "id": 1,
        "user": {
          "id": 1,
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "rsvpStatus": "confirmed",
        "ticketTier": "General Admission",
        "checkedIn": true,
        "checkedInAt": "2024-12-01T08:45:00Z",
        "registeredAt": "2024-10-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 245
    }
  }
}
```

---

### GET /api/events/{id}/analytics
Get event analytics and statistics.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `id` (integer): Event ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalRSVPs": 245,
      "confirmedAttendees": 230,
      "checkedIn": 180,
      "waitlistCount": 15,
      "noShows": 50,
      "cancellations": 10
    },
    "registrationTrend": [
      {
        "date": "2024-10-01",
        "newRegistrations": 15,
        "totalRegistrations": 15
      }
    ],
    "ticketSales": [
      {
        "tierName": "General Admission",
        "sold": 180,
        "revenue": 17820.00
      }
    ],
    "demographics": {
      "byAge": {
        "18-25": 45,
        "26-35": 120,
        "36-45": 65,
        "46+": 15
      },
      "byLocation": {
        "New York": 150,
        "California": 60,
        "Texas": 35
      }
    }
  }
}
```

## Event Categories

- `CONFERENCE` - Professional conferences
- `WORKSHOP` - Educational workshops
- `MEETUP` - Community meetups
- `WEBINAR` - Online presentations
- `SOCIAL` - Social gatherings
- `SPORTS` - Sports events
- `CULTURAL` - Cultural events
- `BUSINESS` - Business events
- `CHARITY` - Charity events
- `OTHER` - Other event types

## Event Status

- `DRAFT` - Event is being created
- `ACTIVE` - Event is published and accepting registrations
- `PAUSED` - Registration temporarily paused
- `CANCELLED` - Event cancelled
- `COMPLETED` - Event finished

## Recurring Events

For recurring events, set `isRecurring: true` and provide `recurrencePattern`:

```json
{
  "isRecurring": true,
  "recurrencePattern": {
    "frequency": "WEEKLY", // DAILY, WEEKLY, MONTHLY, YEARLY
    "interval": 1, // Every 1 week
    "daysOfWeek": [1, 3, 5], // Monday, Wednesday, Friday (1=Monday)
    "endDate": "2024-12-31T23:59:59Z",
    "maxOccurrences": 50
  }
}
```

## Validation Rules

- **Title**: Required, 3-200 characters
- **Start Date**: Required, must be in the future
- **End Date**: Must be after start date
- **Capacity**: Positive integer, max 100,000
- **Registration dates**: Must be logical sequence
- **Virtual events**: Must have virtualLink if isVirtual is true

## Permissions

- **View public events**: Anyone
- **View private events**: Invited users only
- **Create events**: Authenticated users
- **Edit events**: Event organizer, admins
- **Delete events**: Event organizer, admins (with restrictions)

## Error Codes

| Code | Description |
|------|-------------|
| `EVENT_NOT_FOUND` | Event does not exist |
| `INSUFFICIENT_PERMISSIONS` | User cannot perform this action |
| `INVALID_DATE_RANGE` | Start date must be before end date |
| `CAPACITY_EXCEEDED` | Event capacity cannot be negative |
| `REGISTRATION_CLOSED` | Registration period has ended |
| `EVENT_CANCELLED` | Event has been cancelled |