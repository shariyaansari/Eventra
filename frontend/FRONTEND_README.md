# Eventra Frontend

This is the frontend application for Eventra, a comprehensive event management system built with React.js.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Layout, Loading, etc.)
│   ├── auth/            # Authentication components
│   ├── events/          # Event-related components
│   ├── dashboard/       # Dashboard components
│   ├── checkin/         # Check-in components
│   ├── feedback/        # Feedback components
│   └── attendees/       # Attendee management components
├── pages/               # Page components (route components)
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Events.js
│   ├── EventDetails.js
│   ├── CreateEvent.js
│   ├── CheckIn.js
│   ├── Feedback.js
│   └── Profile.js
├── services/            # API service functions
│   ├── api.js           # Base API configuration
│   ├── authService.js   # Authentication API calls
│   ├── eventService.js  # Event management API calls
│   ├── checkinService.js # Check-in API calls
│   └── feedbackService.js # Feedback API calls
├── context/             # React Context providers
│   └── AuthContext.js   # Authentication context
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
│   └── helpers.js       # Common helper functions
├── assets/              # Static assets (images, icons, etc.)
├── App.js               # Main application component
└── index.js             # Application entry point
```

## Features Implemented

### Authentication & Authorization
- User login and registration
- JWT token management
- Role-based access control (Super Admin, Admin, Organizer, Staff, Attendee)
- Protected routes

### Event Management
- Event creation with comprehensive details
- Event listing with search and filters
- Event details view
- RSVP functionality
- Event categories and tags

### Dashboard
- Role-aware dashboard with relevant statistics
- Quick actions based on user permissions
- Recent events overview

### Check-in System
- QR code scanning interface
- Manual check-in functionality
- Bulk check-in support

### Feedback System
- Post-event feedback forms
- Rating system for different aspects
- Comment collection

### User Profile
- Profile management
- Password change functionality

## Technologies Used

- **React 19.1.0** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Day.js** - Date manipulation library
- **React Hook Form** - Form handling
- **QR Code libraries** - QR code generation and scanning

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables file:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend communicates with the Spring Boot backend through RESTful APIs. All API calls are centralized in the `services/` directory with the following structure:

- **Base API Configuration** (`api.js`) - Axios configuration with interceptors
- **Authentication Service** (`authService.js`) - Login, register, profile management
- **Event Service** (`eventService.js`) - Event CRUD operations, RSVP
- **Check-in Service** (`checkinService.js`) - Check-in functionality
- **Feedback Service** (`feedbackService.js`) - Feedback submission and retrieval

## State Management

- **Authentication State** - Managed via React Context (`AuthContext`)
- **Component State** - Local state using React hooks
- **Form State** - Managed with controlled components

## Routing Structure

```
/login                  - User login page
/register              - User registration page
/dashboard             - Main dashboard (default after login)
/events                - Event listing page
/events/:id            - Event details page
/create-event          - Event creation form
/checkin/:eventId      - Check-in interface
/feedback/:eventId     - Feedback form
/profile               - User profile management
```

## Security Features

- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Role-based component rendering
- Secure API communication

## Future Enhancements

- Real-time notifications
- Advanced analytics dashboard
- Mobile app support
- Social media integration
- Payment processing
- Multi-language support
- Dark mode theme
- PWA capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
