# Feedback & Surveys API

This section covers post-event feedback collection, survey management, rating systems, and data export functionality.

## Overview

The feedback system enables organizers to collect valuable insights from attendees through customizable surveys, rating widgets, and feedback forms with comprehensive analytics and export capabilities.

## Survey Object

```json
{
  "id": 1,
  "eventId": 1,
  "title": "Tech Conference 2024 Feedback",
  "description": "Help us improve future events with your feedback",
  "type": "POST_EVENT", // POST_EVENT, DURING_EVENT, REGISTRATION
  "status": "ACTIVE", // DRAFT, ACTIVE, CLOSED, ARCHIVED
  "isRequired": false,
  "isAnonymous": true,
  "allowMultipleResponses": false,
  "autoSendTrigger": "CHECK_OUT", // IMMEDIATE, CHECK_OUT, EVENT_END, CUSTOM
  "customTriggerDelay": null, // Hours after trigger
  "validFrom": "2024-12-01T18:00:00Z",
  "validUntil": "2024-12-08T23:59:59Z",
  "questions": [
    {
      "id": 1,
      "order": 1,
      "type": "RATING",
      "title": "Overall Event Rating",
      "description": "How would you rate the event overall?",
      "required": true,
      "options": {
        "scale": 5,
        "labels": ["Poor", "Fair", "Good", "Very Good", "Excellent"]
      }
    },
    {
      "id": 2,
      "order": 2,
      "type": "MULTIPLE_CHOICE",
      "title": "What did you like most?",
      "required": false,
      "options": {
        "choices": [
          "Speaker quality",
          "Networking opportunities",
          "Venue",
          "Organization",
          "Content relevance"
        ],
        "allowMultiple": true,
        "allowOther": true
      }
    },
    {
      "id": 3,
      "order": 3,
      "type": "TEXT",
      "title": "Additional Comments",
      "description": "Any other feedback you'd like to share?",
      "required": false,
      "options": {
        "maxLength": 1000,
        "placeholder": "Share your thoughts..."
      }
    }
  ],
  "responses": {
    "total": 156,
    "completed": 142,
    "partial": 14,
    "responseRate": 63.7 // percentage of eligible attendees
  },
  "createdBy": {
    "id": 1,
    "name": "Event Organizer"
  },
  "createdAt": "2024-11-25T10:00:00Z",
  "updatedAt": "2024-12-01T15:30:00Z"
}
```

## Endpoints

### GET /api/events/{eventId}/surveys
Get list of surveys for an event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Query Parameters:**
- `type` (string): Filter by survey type
- `status` (string): Filter by status
- `page` (integer): Page number
- `limit` (integer): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "surveys": [
      {
        // Survey object (abbreviated)
        "id": 1,
        "title": "Tech Conference 2024 Feedback",
        "type": "POST_EVENT",
        "status": "ACTIVE",
        "responses": {
          "total": 156,
          "responseRate": 63.7
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3
    }
  }
}
```

---

### GET /api/surveys/{surveyId}
Get detailed survey information.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Complete survey object
  }
}
```

---

### POST /api/events/{eventId}/surveys
Create a new survey for an event.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `eventId` (integer): Event ID

**Request Body:**
```json
{
  "title": "Tech Conference 2024 Feedback",
  "description": "Help us improve future events",
  "type": "POST_EVENT",
  "isRequired": false,
  "isAnonymous": true,
  "autoSendTrigger": "EVENT_END",
  "customTriggerDelay": 2, // 2 hours after event end
  "validUntil": "2024-12-08T23:59:59Z",
  "questions": [
    {
      "type": "RATING",
      "title": "Overall Event Rating",
      "required": true,
      "options": {
        "scale": 5,
        "labels": ["Poor", "Fair", "Good", "Very Good", "Excellent"]
      }
    },
    {
      "type": "TEXT",
      "title": "Suggestions for improvement",
      "required": false,
      "options": {
        "maxLength": 500
      }
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    // Complete survey object with generated ID
  },
  "message": "Survey created successfully"
}
```

---

### PUT /api/surveys/{surveyId}
Update survey details and questions.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Request Body:** (Same format as POST, all fields optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    // Updated survey object
  },
  "message": "Survey updated successfully"
}
```

---

### DELETE /api/surveys/{surveyId}
Delete a survey (only if no responses exist).

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Survey deleted successfully"
}
```

---

### GET /api/surveys/{surveyId}/public
Get public survey for attendee response (no auth required).

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Query Parameters:**
- `token` (string): Access token (for anonymous surveys)
- `userId` (integer): User ID (for personalized surveys)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "survey": {
      "id": 1,
      "title": "Tech Conference 2024 Feedback",
      "description": "Help us improve future events",
      "questions": [
        // Question objects (without admin fields)
      ]
    },
    "event": {
      "title": "Tech Conference 2024",
      "date": "2024-12-01"
    },
    "userResponse": null, // Existing response if any
    "canRespond": true
  }
}
```

---

### POST /api/surveys/{surveyId}/responses
Submit survey response.

**Request Body:**
```json
{
  "respondentId": 1, // Optional, for non-anonymous surveys
  "token": "anonymous-token", // For anonymous access
  "responses": [
    {
      "questionId": 1,
      "answer": 4 // Rating value
    },
    {
      "questionId": 2,
      "answer": ["Speaker quality", "Networking opportunities"]
    },
    {
      "questionId": 3,
      "answer": "Great event, would attend again!"
    }
  ],
  "metadata": {
    "completionTime": 180, // seconds
    "userAgent": "Mozilla/5.0...",
    "referrer": "email"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "responseId": 1,
    "completedAt": "2024-12-01T20:30:00Z",
    "anonymous": true
  },
  "message": "Response submitted successfully"
}
```

---

### GET /api/surveys/{surveyId}/responses
Get survey responses and analytics (organizer only).

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `completed` (boolean): Filter by completion status
- `dateFrom` (string): Filter responses from date
- `dateTo` (string): Filter responses until date

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "responses": [
      {
        "id": 1,
        "respondent": {
          "id": 1,
          "name": "John Doe", // null if anonymous
          "email": "john@example.com" // null if anonymous
        },
        "submittedAt": "2024-12-01T20:30:00Z",
        "completionTime": 180,
        "isComplete": true,
        "answers": [
          {
            "questionId": 1,
            "question": "Overall Event Rating",
            "answer": 4,
            "displayAnswer": "Very Good"
          }
        ]
      }
    ],
    "analytics": {
      "totalResponses": 156,
      "completionRate": 91.0,
      "averageCompletionTime": 145,
      "responseRate": 63.7
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156
    }
  }
}
```

---

### GET /api/surveys/{surveyId}/analytics
Get detailed survey analytics and insights.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalResponses": 156,
      "completedResponses": 142,
      "partialResponses": 14,
      "responseRate": 63.7,
      "averageRating": 4.2,
      "completionRate": 91.0,
      "averageTime": 145 // seconds
    },
    "questionAnalytics": [
      {
        "questionId": 1,
        "type": "RATING",
        "title": "Overall Event Rating",
        "responses": 156,
        "skipRate": 2.6,
        "statistics": {
          "average": 4.2,
          "median": 4,
          "mode": 4,
          "distribution": {
            "1": 3,
            "2": 8,
            "3": 25,
            "4": 78,
            "5": 42
          }
        }
      },
      {
        "questionId": 2,
        "type": "MULTIPLE_CHOICE",
        "title": "What did you like most?",
        "responses": 148,
        "skipRate": 5.1,
        "statistics": {
          "choices": [
            {
              "option": "Speaker quality",
              "count": 89,
              "percentage": 60.1
            },
            {
              "option": "Networking opportunities",
              "count": 67,
              "percentage": 45.3
            }
          ]
        }
      }
    ],
    "trends": {
      "responsesByDay": [
        {
          "date": "2024-12-01",
          "responses": 45
        }
      ],
      "ratingTrend": {
        "direction": "improving",
        "change": 0.3
      }
    },
    "demographics": {
      "byTicketTier": [
        {
          "tier": "General Admission",
          "responses": 120,
          "averageRating": 4.1
        }
      ],
      "byAge": [
        {
          "range": "26-35",
          "responses": 78,
          "averageRating": 4.3
        }
      ]
    }
  }
}
```

---

### GET /api/surveys/{surveyId}/export
Export survey responses in various formats.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Query Parameters:**
- `format` (string): Export format (csv, xlsx, pdf, json)
- `includeAnalytics` (boolean): Include analytics summary
- `anonymize` (boolean): Remove personally identifiable information

**Response (200 OK):**
```http
Content-Type: text/csv
Content-Disposition: attachment; filename="survey-responses-2024-12-01.csv"

Response ID,Submitted At,Overall Rating,Comments,Completion Time
1,2024-12-01 20:30:00,4,"Great event!",180
2,2024-12-01 20:35:00,5,"Excellent speakers",165
```

---

### POST /api/surveys/{surveyId}/send
Send survey invitations to attendees.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Path Parameters:**
- `surveyId` (integer): Survey ID

**Request Body:**
```json
{
  "recipients": "ALL", // ALL, CHECKED_IN, SPECIFIC
  "userIds": [], // For SPECIFIC recipients
  "message": {
    "subject": "We'd love your feedback!",
    "body": "Please take a moment to share your thoughts about the event.",
    "includeEventDetails": true
  },
  "sendMethod": "EMAIL", // EMAIL, SMS, PUSH, IN_APP
  "scheduleFor": null // Immediate send if null
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "invitationId": "INV-001",
    "recipientCount": 245,
    "scheduled": false,
    "estimatedDelivery": "2024-12-01T21:00:00Z"
  },
  "message": "Survey invitations queued for sending"
}
```

---

### GET /api/feedback/quick-ratings
Get quick rating widget data for events.

**Headers:**
```http
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
- `eventId` (integer): Specific event ID
- `timeframe` (string): Time period (7d, 30d, all)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "eventId": 1,
        "title": "Tech Conference 2024",
        "ratings": {
          "overall": 4.2,
          "venue": 4.1,
          "content": 4.4,
          "organization": 4.3,
          "count": 156,
          "distribution": {
            "5": 42,
            "4": 78,
            "3": 25,
            "2": 8,
            "1": 3
          }
        }
      }
    ],
    "summary": {
      "averageRating": 4.2,
      "totalRatings": 856,
      "trend": "improving"
    }
  }
}
```

## Question Types

### RATING
Star or numeric rating scale.
```json
{
  "type": "RATING",
  "options": {
    "scale": 5, // 1-10 scale
    "style": "stars", // stars, numbers, emoji
    "labels": ["Poor", "Excellent"] // Optional labels
  }
}
```

### MULTIPLE_CHOICE
Single or multiple selection.
```json
{
  "type": "MULTIPLE_CHOICE",
  "options": {
    "choices": ["Option 1", "Option 2"],
    "allowMultiple": false,
    "allowOther": true,
    "randomizeOrder": false
  }
}
```

### TEXT
Free text response.
```json
{
  "type": "TEXT",
  "options": {
    "maxLength": 1000,
    "minLength": 10,
    "placeholder": "Enter your response...",
    "multiline": true
  }
}
```

### LIKERT_SCALE
Agreement scale questions.
```json
{
  "type": "LIKERT_SCALE",
  "options": {
    "statements": [
      "The event was well organized",
      "The content was relevant"
    ],
    "scale": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  }
}
```

### NPS
Net Promoter Score question.
```json
{
  "type": "NPS",
  "options": {
    "question": "How likely are you to recommend this event?",
    "followUp": {
      "promoter": "What did you love most?",
      "detractor": "How can we improve?"
    }
  }
}
```

## Survey Types

- **POST_EVENT**: Sent after event completion
- **DURING_EVENT**: Available during the event
- **REGISTRATION**: Collected during registration
- **PRE_EVENT**: Sent before event starts
- **FOLLOW_UP**: Sent weeks/months after event

## Trigger Types

- **IMMEDIATE**: Send immediately when survey is activated
- **CHECK_OUT**: Send when attendee checks out
- **EVENT_END**: Send when event officially ends
- **CUSTOM**: Send after custom delay
- **MANUAL**: Manual sending only

## Analytics Metrics

- **Response Rate**: Percentage of eligible attendees who responded
- **Completion Rate**: Percentage of started surveys that were completed
- **Average Time**: Average time to complete survey
- **NPS Score**: Net Promoter Score calculation
- **Satisfaction Score**: Overall satisfaction rating
- **Question Skip Rate**: Percentage of respondents who skipped each question

## Export Options

- **CSV**: Raw data for analysis
- **Excel**: Formatted spreadsheet with charts
- **PDF**: Summary report with visualizations
- **JSON**: Structured data for API integration

## Privacy & Compliance

- **GDPR Compliance**: Data retention and deletion policies
- **Anonymous Surveys**: No personally identifiable information collected
- **Data Encryption**: All responses encrypted at rest and in transit
- **Access Control**: Role-based access to survey data
- **Audit Trail**: Complete audit log of survey access and modifications

## Error Codes

| Code | Description |
|------|-------------|
| `SURVEY_NOT_FOUND` | Survey does not exist |
| `SURVEY_EXPIRED` | Survey is no longer accepting responses |
| `ALREADY_RESPONDED` | User has already submitted a response |
| `INVALID_RESPONSE` | Response data is invalid or incomplete |
| `SURVEY_INACTIVE` | Survey is not currently active |
| `INSUFFICIENT_PERMISSIONS` | User lacks permissions to access survey |
| `QUESTION_REQUIRED` | Required question was not answered |
| `RESPONSE_TOO_LONG` | Text response exceeds maximum length |