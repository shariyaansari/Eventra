# Dashboards & Analytics API

This section covers analytics endpoints, reporting functionality, and role-based dashboard data for organizers, volunteers, and administrators.

## Overview

The analytics system provides comprehensive insights into event performance, attendee behavior, and operational metrics with role-based access control and real-time data updates.

## Analytics Object

```json
{
  "eventId": 1,
  "timeframe": {
    "start": "2024-12-01T00:00:00Z",
    "end": "2024-12-01T23:59:59Z",
    "timezone": "America/New_York"
  },
  "overview": {
    "totalEvents": 1,
    "totalRSVPs": 245,
    "confirmedAttendees": 230,
    "checkedIn": 180,
    "noShows": 50,
    "walkIns": 5,
    "cancellations": 15,
    "revenue": 24500.00,
    "refunds": 1500.00,
    "netRevenue": 23000.00
  },
  "trends": {
    "registrationGrowth": 12.5, // percentage
    "checkInRate": 73.5,
    "cancellationRate": 6.1,
    "revenueGrowth": 8.3
  },
  "demographics": {
    "ageGroups": {
      "18-25": 45,
      "26-35": 120,
      "36-45": 65,
      "46+": 15
    },
    "genderDistribution": {
      "male": 52,
      "female": 45,
      "other": 2,
      "not_specified": 1
    },
    "locations": {
      "local": 180, // within 50 miles
      "regional": 45, // 50-200 miles
      "national": 20 // 200+ miles
    }
  },
  "performance": {
    "conversionRate": 65.2, // visitors to registrations
    "dropoffRate": 12.8, // registration dropoff
    "engagementScore": 8.4,
    "satisfactionRating": 4.2
  }
}
```

## Endpoints

### GET /api/dashboard/overview
Get high-level dashboard overview for current user.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `timeframe` (string): Time period (7d, 30d, 90d, 1y, custom)
- `startDate` (string): Start date for custom timeframe
- `endDate` (string): End date for custom timeframe

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "role": "ORGANIZER",
      "permissions": ["view_analytics", "manage_events"]
    },
    "overview": {
      "totalEvents": 12,
      "upcomingEvents": 3,
      "totalAttendees": 2450,
      "revenue": 125000.00,
      "averageRating": 4.3
    },
    "recentActivity": [
      {
        "type": "NEW_REGISTRATION",
        "event": "Tech Conference 2024",
        "user": "John Doe",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "alerts": [
      {
        "type": "LOW_REGISTRATION",
        "event": "Workshop 2024",
        "message": "Registration below expected",
        "severity": "warning"
      }
    ]
  }
}
```

---

### GET /api/events/{eventId}/analytics
Get comprehensive analytics for a specific event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `metrics` (array): Specific metrics to include (overview, demographics, timeline, revenue)
- `granularity` (string): Data granularity (hour, day, week, month)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "event": {
      "id": 1,
      "title": "Tech Conference 2024",
      "status": "ACTIVE"
    },
    "overview": {
      "registrations": {
        "total": 245,
        "confirmed": 230,
        "pending": 10,
        "declined": 5,
        "waitlisted": 25
      },
      "attendance": {
        "expected": 230,
        "checkedIn": 180,
        "noShows": 50,
        "checkInRate": 78.3
      },
      "revenue": {
        "gross": 24500.00,
        "fees": 1500.00,
        "refunds": 500.00,
        "net": 22500.00
      }
    },
    "timeline": {
      "registrations": [
        {
          "date": "2024-10-01",
          "newRegistrations": 15,
          "cumulativeRegistrations": 15,
          "revenue": 1500.00
        }
      ],
      "checkIns": [
        {
          "hour": "08:00",
          "count": 15,
          "cumulative": 15
        }
      ]
    },
    "demographics": {
      "age": {
        "18-25": 18.4, // percentage
        "26-35": 49.0,
        "36-45": 26.5,
        "46+": 6.1
      },
      "geography": [
        {
          "city": "New York",
          "state": "NY",
          "count": 85,
          "percentage": 34.7
        }
      ],
      "referralSources": [
        {
          "source": "social_media",
          "count": 120,
          "percentage": 49.0
        }
      ]
    },
    "satisfaction": {
      "overall": 4.2,
      "venue": 4.1,
      "content": 4.4,
      "organization": 4.3,
      "responseRate": 65.2,
      "npsScore": 7.8
    }
  }
}
```

---

### GET /api/analytics/events
Get analytics across multiple events for comparison.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `eventIds` (array): Specific event IDs to compare
- `category` (string): Filter by event category
- `timeframe` (string): Time period for comparison
- `metrics` (array): Metrics to compare

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "comparison": [
      {
        "eventId": 1,
        "title": "Tech Conference 2024",
        "registrations": 245,
        "attendance": 180,
        "revenue": 24500.00,
        "rating": 4.2
      },
      {
        "eventId": 2,
        "title": "Workshop Series",
        "registrations": 120,
        "attendance": 95,
        "revenue": 9500.00,
        "rating": 4.1
      }
    ],
    "trends": {
      "registrationGrowth": 15.2,
      "attendanceGrowth": 8.7,
      "revenueGrowth": 22.1
    },
    "benchmarks": {
      "averageCheckInRate": 75.5,
      "averageRating": 4.15,
      "industryAverage": {
        "checkInRate": 72.0,
        "rating": 4.0
      }
    }
  }
}
```

---

### GET /api/analytics/revenue
Get detailed revenue analytics.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `eventId` (integer): Specific event (optional)
- `timeframe` (string): Time period
- `breakdown` (string): Breakdown by (event, ticket_tier, date, payment_method)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 125000.00,
      "grossRevenue": 135000.00,
      "refunds": 5000.00,
      "fees": 5000.00,
      "netRevenue": 125000.00,
      "averageTicketPrice": 89.50,
      "revenuePerEvent": 10416.67
    },
    "breakdown": [
      {
        "category": "General Admission",
        "revenue": 80000.00,
        "ticketsSold": 1000,
        "averagePrice": 80.00,
        "percentage": 64.0
      },
      {
        "category": "VIP",
        "revenue": 45000.00,
        "ticketsSold": 225,
        "averagePrice": 200.00,
        "percentage": 36.0
      }
    ],
    "trends": [
      {
        "month": "2024-01",
        "revenue": 12500.00,
        "growth": 8.5
      }
    ],
    "forecasting": {
      "nextMonth": 15000.00,
      "confidence": 85.2,
      "factors": ["seasonal_trends", "historical_data", "upcoming_events"]
    }
  }
}
```

---

### GET /api/analytics/engagement
Get user engagement analytics.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `eventId` (integer): Specific event (optional)
- `userSegment` (string): User segment (new, returning, vip)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 2450,
      "activeUsers": 1890,
      "engagementRate": 77.1,
      "averageEventsPerUser": 2.3,
      "retentionRate": 65.4
    },
    "segments": [
      {
        "segment": "new_users",
        "count": 450,
        "engagementRate": 62.1,
        "conversionRate": 45.2
      },
      {
        "segment": "returning_users",
        "count": 1200,
        "engagementRate": 85.3,
        "conversionRate": 78.9
      }
    ],
    "activities": [
      {
        "activity": "event_view",
        "count": 15420,
        "uniqueUsers": 1890
      },
      {
        "activity": "registration_start",
        "count": 3250,
        "uniqueUsers": 2100
      },
      {
        "activity": "registration_complete",
        "count": 2450,
        "uniqueUsers": 2450
      }
    ],
    "cohortAnalysis": [
      {
        "cohort": "2024-01",
        "size": 250,
        "retention": {
          "month1": 85.2,
          "month2": 72.4,
          "month3": 65.8
        }
      }
    ]
  }
}
```

---

### GET /api/analytics/realtime
Get real-time event metrics during live events.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `eventId` (integer): Event ID
- `refresh` (integer): Refresh interval in seconds

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "timestamp": "2024-12-01T10:30:00Z",
    "event": {
      "id": 1,
      "status": "LIVE",
      "startTime": "2024-12-01T09:00:00Z"
    },
    "checkIns": {
      "total": 180,
      "lastHour": 45,
      "last15Minutes": 12,
      "rate": 3.2, // per minute
      "peak": {
        "time": "08:45",
        "count": 15
      }
    },
    "capacity": {
      "current": 180,
      "maximum": 245,
      "utilizationRate": 73.5,
      "trend": "increasing"
    },
    "waitlist": {
      "active": 25,
      "promoted": 5,
      "average_wait": "15 minutes"
    },
    "issues": [
      {
        "type": "SLOW_CHECKIN",
        "location": "Main Entrance",
        "severity": "medium",
        "message": "Check-in queue building up"
      }
    ]
  }
}
```

---

### POST /api/analytics/custom
Create custom analytics report.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Monthly Performance Report",
  "timeframe": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "events": [1, 2, 3], // Optional event filter
  "metrics": [
    "registrations",
    "attendance",
    "revenue",
    "satisfaction"
  ],
  "dimensions": [
    "event_category",
    "ticket_tier",
    "user_segment"
  ],
  "format": "pdf", // pdf, xlsx, csv
  "delivery": {
    "email": "organizer@example.com",
    "schedule": "monthly" // one-time, daily, weekly, monthly
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "reportId": "RPT-001",
    "status": "GENERATING",
    "estimatedCompletion": "2024-01-15T10:35:00Z",
    "downloadUrl": null // Available when complete
  },
  "message": "Custom report queued for generation"
}
```

---

### GET /api/analytics/reports/{reportId}
Get status and download link for generated report.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `reportId` (string): Report ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reportId": "RPT-001",
    "name": "Monthly Performance Report",
    "status": "COMPLETED",
    "generatedAt": "2024-01-15T10:32:00Z",
    "downloadUrl": "https://api.eventra.com/downloads/reports/RPT-001.pdf",
    "expiresAt": "2024-01-22T10:32:00Z",
    "fileSize": "2.5 MB",
    "format": "pdf"
  }
}
```

## Role-Based Access

Different user roles have access to different analytics levels:

### USER
- Own event registrations and attendance
- Basic event performance metrics
- Personal engagement statistics

### ORGANIZER
- Full analytics for owned events
- Revenue and financial metrics
- Attendee demographics and behavior
- Operational metrics (check-ins, etc.)

### ADMIN
- Organization-wide analytics
- Cross-event comparisons
- User behavior analytics
- System performance metrics

### SUPER_ADMIN
- Platform-wide analytics
- Tenant/organization comparisons
- System health and usage metrics
- Business intelligence dashboards

## Real-time Updates

Analytics data is updated in real-time using WebSocket connections:

```javascript
// WebSocket endpoint for real-time analytics
wss://api.eventra.com/analytics/realtime

// Message format
{
  "type": "METRIC_UPDATE",
  "eventId": 1,
  "metric": "check_ins",
  "value": 181,
  "change": 1,
  "timestamp": "2024-12-01T10:30:00Z"
}
```

## Data Retention

- **Real-time data**: 24 hours
- **Detailed analytics**: 2 years
- **Summary analytics**: 5 years
- **Archived data**: Available on request

## Export Formats

- **CSV**: For data analysis
- **Excel**: For business reporting
- **PDF**: For presentation reports
- **JSON**: For API integration
- **Charts**: PNG/SVG image exports

## Performance Metrics

Key performance indicators tracked:

1. **Conversion Metrics**
   - Registration conversion rate
   - Payment completion rate
   - Check-in rate
   - Engagement rate

2. **Financial Metrics**
   - Revenue per event
   - Average ticket price
   - Refund rate
   - Cost per acquisition

3. **Operational Metrics**
   - Check-in speed
   - Queue times
   - Staff efficiency
   - System uptime

4. **Satisfaction Metrics**
   - Net Promoter Score (NPS)
   - Event ratings
   - Feedback response rate
   - Return attendance rate

## Error Codes

| Code | Description |
|------|-------------|
| `INSUFFICIENT_DATA` | Not enough data for meaningful analytics |
| `INVALID_TIMEFRAME` | Timeframe parameters are invalid |
| `REPORT_NOT_FOUND` | Analytics report does not exist |
| `REPORT_EXPIRED` | Report download link has expired |
| `GENERATION_FAILED` | Report generation failed |
| `INSUFFICIENT_PERMISSIONS` | User lacks permissions for requested analytics |