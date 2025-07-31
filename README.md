# Eventra

Eventra is a modern full-stack open-source event management system designed to help communities, colleges, and organizations create, manage, and track events with ease.
It provides a comprehensive set of features for event creation, attendee management, check-in processes, and post-event feedback.

---
## ✨ Features

| Category            | Highlights                                                                 |
|---------------------|----------------------------------------------------------------------------|
| **Event Management** | Create one‑off or recurring events, set capacities, ticket tiers, and registration windows. |
| **RSVP & Attendees** | Public/Private RSVP, waiting‑list automation, real‑time attendee counts.   |
| **Check‑in**         | QR‑code generation, mobile scan interface, offline fallback list.          |
| **Dashboards**       | Role‑aware analytics (organizer, volunteer, admin).                        |
| **Feedback**         | Post‑event survey builder, rating widgets, export to CSV.                  |
| **Permissions**      | Fine‑grained roles (Super‑Admin ▸ Admin ▸ Organizer ▸ Staff ▸ Attendee).   |

---

## 🏗️ Architecture

### Frontend (React.js)
- **Framework**: React 18.2.0 with modern hooks and functional components
- **Routing**: React Router DOM v6 for navigation
- **Animations**: Framer Motion for smooth UI transitions
- **UI Components**: Custom components with responsive design
- **State Management**: React Context and hooks
- **Styling**: CSS modules with shared layouts

#### Frontend Components
- **Landing Page**: Hero section, features showcase, testimonials
- **Authentication**: Login, registration, and profile management
- **Event Management**: Create, view, and manage events
- **Dashboard**: Role-based analytics and management interface
- **Community**: Social features and user interaction

### Backend (Spring Boot)
- **Framework**: Spring Boot with Java
- **Database**: MySQL with JPA/Hibernate
- **Authentication**: JWT-based security
- **API**: RESTful endpoints

---

## 🛠️ Tech Stack

### Frontend
- **React.js** 18.2.0 - Modern UI library
- **React Router DOM** 6.8.0 - Client-side routing
- **Framer Motion** 8.5.2 - Animation library
- **React Intersection Observer** 9.4.1 - Scroll-based animations
- **Heroicons** 2.0.16 - Icon library

### Backend
- **Spring Boot** - Java framework
- **MySQL** - Database
- **Maven** - Build tool
- **JWT** - Authentication

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Java** 11 or higher
- **Maven** 3.6+
- **MySQL** 8.0+

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Database Setup
1. Create a MySQL database named `eventra`
2. Update `backend/src/main/resources/application.properties` with your database credentials
3. The application will auto-create tables on first run

---

## 🚀 Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Backend
- `mvn spring-boot:run` - Start the application
- `mvn clean install` - Build the project
- `mvn test` - Run tests

---

## 📁 Project Structure

```
Eventra/
├── frontend/                 # React.js frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   └── package.json
├── backend/                 # Spring Boot backend
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Configuration files
│   └── pom.xml
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 API Documentation

Comprehensive API documentation is available for developers and integrators:

- **[API Documentation](./docs/README.md)** - Complete API reference and guides
- **[OpenAPI Specification](./docs/openapi.yaml)** - Machine-readable API specification
- **[Authentication Guide](./docs/authentication.md)** - User management and security
- **[Events API](./docs/events.md)** - Event creation and management
- **[RSVP & Attendees](./docs/rsvp-attendees.md)** - Registration and attendee management
- **[Check-in System](./docs/checkin.md)** - QR codes and attendance tracking
- **[Analytics & Dashboards](./docs/dashboards.md)** - Event analytics and reporting
- **[Feedback & Surveys](./docs/feedback.md)** - Post-event feedback collection
- **[Admin Operations](./docs/admin.md)** - Administrative functionality
- **[Error Codes](./docs/errors.md)** - Complete error reference

## 🔗 Links

- **Frontend**: Modern React.js application with responsive design
- **Backend**: RESTful API built with Spring Boot
- **Database**: MySQL for reliable data storage
- **API Docs**: Comprehensive API documentation for developers
