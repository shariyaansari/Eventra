# Error Codes Reference

This document provides a comprehensive reference for all error codes, HTTP status codes, and error handling patterns used in the Eventra API.

## Error Response Format

All API errors follow a consistent JSON structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": ["Additional error details", "Field-specific errors"],
    "field": "fieldName", // For validation errors
    "suggestion": "Try checking your input data"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_1234567890",
  "path": "/api/events/123"
}
```

## HTTP Status Codes

### 2xx Success
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **202 Accepted**: Request accepted for processing
- **204 No Content**: Successful request with no response body

### 4xx Client Errors
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or invalid
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **405 Method Not Allowed**: HTTP method not supported
- **409 Conflict**: Resource conflict (e.g., duplicate)
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded

### 5xx Server Errors
- **500 Internal Server Error**: Unexpected server error
- **502 Bad Gateway**: Upstream service error
- **503 Service Unavailable**: Service temporarily unavailable
- **504 Gateway Timeout**: Upstream service timeout

## Authentication & Authorization Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `INVALID_TOKEN` | 401 | JWT token is invalid or malformed | Obtain a new token via login |
| `TOKEN_EXPIRED` | 401 | JWT token has expired | Refresh token or login again |
| `TOKEN_MISSING` | 401 | Authorization header is missing | Include valid Bearer token |
| `REFRESH_TOKEN_INVALID` | 401 | Refresh token is invalid | Login again to get new tokens |
| `INSUFFICIENT_PERMISSIONS` | 403 | User lacks required permissions | Contact admin for role update |
| `ACCOUNT_SUSPENDED` | 403 | User account is suspended | Contact support for reactivation |
| `EMAIL_NOT_VERIFIED` | 403 | Email address not verified | Check email and verify account |
| `ACCOUNT_LOCKED` | 423 | Account locked due to failed attempts | Wait or contact support |

## User Management Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `USER_NOT_FOUND` | 404 | User account does not exist | Check user ID or email |
| `EMAIL_ALREADY_EXISTS` | 409 | Email is already registered | Use different email or login |
| `INVALID_CREDENTIALS` | 401 | Invalid email or password | Check credentials and retry |
| `WEAK_PASSWORD` | 422 | Password doesn't meet requirements | Use stronger password |
| `PASSWORD_MISMATCH` | 422 | Password confirmation doesn't match | Ensure passwords match |
| `INVALID_EMAIL_FORMAT` | 422 | Email format is invalid | Use valid email format |
| `USER_ALREADY_VERIFIED` | 409 | Email already verified | No action needed |
| `VERIFICATION_TOKEN_INVALID` | 400 | Verification token is invalid | Request new verification email |

## Event Management Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `EVENT_NOT_FOUND` | 404 | Event does not exist | Check event ID |
| `EVENT_CANCELLED` | 410 | Event has been cancelled | Event is no longer available |
| `EVENT_ENDED` | 410 | Event has already ended | Cannot perform action on past event |
| `EVENT_NOT_STARTED` | 425 | Event hasn't started yet | Wait for event start time |
| `INVALID_DATE_RANGE` | 422 | Start date must be before end date | Correct date order |
| `DATE_IN_PAST` | 422 | Event date cannot be in the past | Use future date |
| `CAPACITY_EXCEEDED` | 422 | Event capacity cannot be negative | Use positive capacity value |
| `INVALID_LOCATION` | 422 | Location data is invalid | Provide valid location |
| `VIRTUAL_LINK_REQUIRED` | 422 | Virtual events need a meeting link | Add virtual meeting link |
| `DUPLICATE_EVENT_SLUG` | 409 | Event slug already exists | Use unique slug |

## RSVP & Attendee Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `ALREADY_REGISTERED` | 409 | User already has RSVP for event | Update existing RSVP instead |
| `EVENT_FULL` | 409 | Event has reached capacity | Join waitlist if available |
| `REGISTRATION_CLOSED` | 403 | Registration period has ended | Contact organizer |
| `REGISTRATION_NOT_OPEN` | 403 | Registration hasn't opened yet | Wait for registration to open |
| `APPROVAL_REQUIRED` | 202 | Event requires organizer approval | Wait for approval |
| `INVALID_TICKET_TIER` | 422 | Selected ticket tier is invalid | Choose valid ticket tier |
| `TICKET_TIER_FULL` | 409 | Ticket tier has reached capacity | Choose different tier |
| `PAYMENT_REQUIRED` | 402 | Payment is required for registration | Complete payment |
| `RSVP_NOT_FOUND` | 404 | RSVP record does not exist | Register for event first |
| `WAITLIST_FULL` | 409 | Waitlist has reached capacity | Cannot join waitlist |

## Check-in Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `ALREADY_CHECKED_IN` | 409 | Attendee is already checked in | No further action needed |
| `INVALID_QR_CODE` | 400 | QR code is invalid or corrupted | Generate new QR code |
| `EXPIRED_QR_CODE` | 410 | QR code has expired | Generate new QR code |
| `QR_CODE_USED` | 409 | QR code has already been used | Cannot reuse QR code |
| `ATTENDEE_NOT_FOUND` | 404 | Attendee not found for this event | Verify attendee registration |
| `INVALID_RSVP_STATUS` | 422 | RSVP status doesn't allow check-in | Confirm RSVP first |
| `DEVICE_NOT_AUTHORIZED` | 403 | Check-in device is not authorized | Use authorized device |
| `LOCATION_MISMATCH` | 422 | Check-in location doesn't match | Use correct entrance |
| `DUPLICATE_SCAN` | 409 | Same QR code scanned multiple times | Avoid duplicate scans |

## Payment & Billing Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `PAYMENT_FAILED` | 402 | Payment processing failed | Try different payment method |
| `CARD_DECLINED` | 402 | Credit card was declined | Use different card |
| `INSUFFICIENT_FUNDS` | 402 | Insufficient funds on card | Add funds or use different card |
| `INVALID_CARD_NUMBER` | 422 | Card number is invalid | Check card number |
| `CARD_EXPIRED` | 422 | Credit card has expired | Use current card |
| `INVALID_CVV` | 422 | CVV code is invalid | Check CVV on card |
| `REFUND_NOT_ALLOWED` | 403 | Refund not permitted for this item | Check refund policy |
| `REFUND_PERIOD_EXPIRED` | 403 | Refund period has expired | Refunds no longer available |
| `PARTIAL_REFUND_NOT_SUPPORTED` | 422 | Partial refunds not supported | Request full refund |

## Survey & Feedback Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `SURVEY_NOT_FOUND` | 404 | Survey does not exist | Check survey ID |
| `SURVEY_EXPIRED` | 410 | Survey is no longer accepting responses | Cannot submit response |
| `SURVEY_INACTIVE` | 403 | Survey is not currently active | Wait for survey activation |
| `ALREADY_RESPONDED` | 409 | User has already submitted response | Cannot submit multiple responses |
| `INVALID_RESPONSE` | 422 | Response data is invalid | Check response format |
| `QUESTION_REQUIRED` | 422 | Required question was not answered | Answer all required questions |
| `RESPONSE_TOO_LONG` | 422 | Text response exceeds maximum length | Shorten response text |
| `INVALID_RATING_VALUE` | 422 | Rating value is out of range | Use valid rating scale |

## File Upload Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `FILE_TOO_LARGE` | 413 | File size exceeds maximum limit | Use smaller file |
| `INVALID_FILE_TYPE` | 422 | File type is not supported | Use supported file format |
| `UPLOAD_FAILED` | 500 | File upload failed due to server error | Retry upload |
| `VIRUS_DETECTED` | 422 | File contains malicious content | Use clean file |
| `CORRUPTED_FILE` | 422 | File is corrupted or unreadable | Use valid file |
| `STORAGE_QUOTA_EXCEEDED` | 507 | Storage quota exceeded | Delete files or upgrade plan |

## Rate Limiting Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests in time window | Wait and retry later |
| `DAILY_LIMIT_EXCEEDED` | 429 | Daily API limit exceeded | Wait until tomorrow |
| `CONCURRENT_LIMIT_EXCEEDED` | 429 | Too many concurrent requests | Reduce concurrent requests |
| `LOGIN_ATTEMPTS_EXCEEDED` | 429 | Too many login attempts | Wait before trying again |

## System & Infrastructure Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error occurred | Contact support if persistent |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable | Retry after some time |
| `DATABASE_CONNECTION_ERROR` | 503 | Cannot connect to database | Retry request |
| `MAINTENANCE_MODE` | 503 | System is under maintenance | Wait for maintenance to complete |
| `FEATURE_DISABLED` | 503 | Feature is temporarily disabled | Use alternative approach |
| `UPSTREAM_SERVICE_ERROR` | 502 | External service error | Retry or contact support |

## Validation Errors

| Code | HTTP Status | Description | Example |
|------|-------------|-------------|---------|
| `VALIDATION_ERROR` | 422 | Request data validation failed | Missing required fields |
| `FIELD_REQUIRED` | 422 | Required field is missing | `{"field": "email", "message": "Email is required"}` |
| `FIELD_TOO_LONG` | 422 | Field value exceeds maximum length | `{"field": "title", "maxLength": 200}` |
| `FIELD_TOO_SHORT` | 422 | Field value below minimum length | `{"field": "password", "minLength": 8}` |
| `INVALID_FORMAT` | 422 | Field format is invalid | `{"field": "email", "format": "email"}` |
| `INVALID_ENUM_VALUE` | 422 | Value not in allowed enum | `{"field": "status", "allowed": ["active", "inactive"]}` |
| `INVALID_RANGE` | 422 | Numeric value out of range | `{"field": "capacity", "min": 1, "max": 10000}` |

## Admin & Moderation Errors

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `INSUFFICIENT_ADMIN_PERMISSIONS` | 403 | User lacks admin permissions | Contact super admin |
| `ORGANIZATION_NOT_FOUND` | 404 | Organization does not exist | Check organization ID |
| `USER_CANNOT_BE_SUSPENDED` | 422 | User cannot be suspended | Cannot suspend last admin |
| `SETTING_VALIDATION_FAILED` | 422 | System setting value is invalid | Use valid setting value |
| `AUDIT_LOG_ACCESS_DENIED` | 403 | Cannot access audit logs | Requires admin permissions |

## Handling Errors in Client Applications

### JavaScript/TypeScript Example
```javascript
async function handleApiCall() {
  try {
    const response = await fetch('/api/events', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      handleApiError(error);
      return;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network error:', error);
  }
}

function handleApiError(error) {
  switch (error.error.code) {
    case 'TOKEN_EXPIRED':
      // Redirect to login
      redirectToLogin();
      break;
    case 'EVENT_FULL':
      // Show waitlist option
      showWaitlistDialog();
      break;
    case 'VALIDATION_ERROR':
      // Show field-specific errors
      showValidationErrors(error.error.details);
      break;
    default:
      // Show generic error message
      showErrorMessage(error.error.message);
  }
}
```

### Retry Logic
```javascript
async function apiWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        const retryAfter = response.headers.get('Retry-After') || 60;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      if (response.status >= 500) {
        // Server error, retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

## Error Monitoring

For production applications, implement proper error monitoring:

1. **Log all errors** with request IDs for debugging
2. **Monitor error rates** and set up alerts
3. **Track user-facing errors** separately from system errors
4. **Implement graceful degradation** for non-critical features
5. **Provide meaningful feedback** to users

## Contact Support

If you encounter persistent errors or need clarification:

- 📧 **API Support**: api-support@eventra.com
- 💬 **Community**: [Discord Server](https://discord.gg/eventra)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/SandeepVashishtha/Eventra/issues)
- 📚 **Documentation**: [API Docs](https://docs.eventra.com)