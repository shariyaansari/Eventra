# API Documentation Index

This directory contains comprehensive documentation for the Eventra API.

## 📖 Documentation Structure

### Core API Documentation
- **[README.md](./README.md)** - Main API documentation overview
- **[openapi.yaml](./openapi.yaml)** - OpenAPI 3.0 specification
- **[CHANGELOG.md](./CHANGELOG.md)** - API version history and changes
- **[errors.md](./errors.md)** - Complete error codes reference

### API Endpoint Documentation
- **[authentication.md](./authentication.md)** - User authentication and management
- **[events.md](./events.md)** - Event creation and management
- **[rsvp-attendees.md](./rsvp-attendees.md)** - RSVP and attendee management
- **[checkin.md](./checkin.md)** - Check-in and QR code functionality
- **[dashboards.md](./dashboards.md)** - Analytics and dashboard APIs
- **[feedback.md](./feedback.md)** - Feedback and survey management
- **[admin.md](./admin.md)** - Administrative operations

## 🚀 Quick Start

1. **Read the [API Overview](./README.md)** to understand the basics
2. **Check [Authentication](./authentication.md)** to learn about security
3. **Explore [Events API](./events.md)** to start building with events
4. **Review [Error Codes](./errors.md)** for proper error handling

## 🔍 Finding What You Need

### By Use Case
- **Building a mobile app?** → Start with [Authentication](./authentication.md) and [Events](./events.md)
- **Integrating with existing system?** → Check [OpenAPI spec](./openapi.yaml)
- **Building analytics dashboard?** → Review [Analytics APIs](./dashboards.md)
- **Adding event feedback?** → Explore [Feedback APIs](./feedback.md)
- **Admin functionality?** → See [Admin APIs](./admin.md)

### By API Category
- **User Management**: [Authentication](./authentication.md)
- **Event Operations**: [Events](./events.md), [RSVP](./rsvp-attendees.md), [Check-in](./checkin.md)
- **Data & Analytics**: [Dashboards](./dashboards.md), [Feedback](./feedback.md)
- **Administration**: [Admin](./admin.md)

## 📋 API Reference Summary

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **Auth** | `/api/auth/*` | User registration, login, profile management |
| **Events** | `/api/events/*` | Event CRUD, search, analytics |
| **RSVP** | `/api/events/{id}/rsvp` | Registration, waitlist, attendee management |
| **Check-in** | `/api/events/{id}/checkin/*` | QR codes, scanning, attendance tracking |
| **Analytics** | `/api/analytics/*` | Event metrics, dashboards, reporting |
| **Surveys** | `/api/surveys/*` | Feedback collection, survey management |
| **Admin** | `/api/admin/*` | User management, system administration |

## 🛠️ Development Tools

- **[OpenAPI Specification](./openapi.yaml)** - Import into Postman, Insomnia, or generate SDKs
- **[Error Reference](./errors.md)** - Complete error handling guide
- **[Changelog](./CHANGELOG.md)** - Track API changes and updates

## 📞 Support

Need help with the API?

- 📧 **Email**: [api-support@eventra.com](mailto:api-support@eventra.com)
- 💬 **Discord**: [Join our community](https://discord.gg/eventra)
- 🐛 **Issues**: [GitHub Issues](https://github.com/SandeepVashishtha/Eventra/issues)
- 📚 **Docs**: [Online Documentation](https://docs.eventra.com)

---

*This documentation is actively maintained and updated with each API release.*