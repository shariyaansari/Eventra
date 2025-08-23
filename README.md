# Eventra 🎉

**A Modern Event Management Platform for Builders and Communities**

Eventra is a comprehensive event management system that empowers organizers to create, manage, and track events seamlessly. Built with a modern tech stack featuring React frontend and Spring Boot backend, Eventra provides everything needed to run successful events from creation to post-event analytics.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Frontend Components](#-frontend-components)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Event Creation & Management** - Create and customize events with rich details
- **User Authentication & Authorization** - Secure JWT-based authentication system
- **RSVP Management** - Handle attendee registrations and responses
- **QR Code Check-ins** - Streamlined event check-in process
- **Real-time Analytics** - Track event performance and attendee engagement
- **Admin Dashboard** - Comprehensive administrative controls
- **User Dashboard** - Personalized user experience and event tracking

### 🏗️ Platform Features
- **Hackathon Hub** - Specialized features for hackathon management
- **Project Gallery** - Showcase community projects and collaborations
- **Collaboration Tools** - Foster community engagement and networking
- **Feedback System** - Post-event surveys and feedback collection
- **Leaderboards** - Gamification and community recognition
- **Responsive Design** - Mobile-first, responsive user interface

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.3.1
- **Language**: Java 17
- **Database**: MySQL (Aiven) with H2 for development
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven
- **Documentation**: OpenAPI 3.0 with Springdoc
- **Key Dependencies**: 
  - Spring Data JPA
  - Spring Web
  - Spring Security
  - JJWT for JWT tokens
  - H2 Database (development)
  - MySQL Connector
  - Lombok
  - Spring Boot DevTools

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **Animations**: Framer Motion 8.5.2
- **Icons**: Heroicons React 2.0.16
- **Observers**: React Intersection Observer 9.4.1
- **Styling**: CSS with modern responsive design
- **Build Tool**: Create React App

### DevOps & Infrastructure
- **Environment Profiles**: Development, Production, Azure
- **API Documentation**: OpenAPI/Swagger specification
- **Version Control**: Git with comprehensive documentation

## 🏗️ Architecture

```
Eventra/
├── backend/                    # Spring Boot API Server
│   ├── src/main/java/com/eventra/
│   │   ├── config/            # Configuration classes (CORS, OpenAPI)
│   │   ├── controller/        # REST API controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA entities (User, Event, Project)
│   │   ├── service/          # Business logic services
│   │   ├── repository/       # Data access layer
│   │   ├── filter/          # JWT authentication filter
│   │   ├── util/            # Utility classes (JWT, Validation)
│   │   └── exception/        # Custom exceptions
│   └── src/main/resources/    # Configuration files
│       ├── application.properties      # Main configuration
│       ├── application-dev.properties  # Development settings
│       ├── application-prod.properties # Production settings
│       └── application-azure.properties # Azure deployment
├── frontend/                  # React Web Application
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # React components
│       │   ├── auth/        # Authentication components
│       │   ├── admin/       # Admin dashboard
│       │   ├── user/        # User dashboard
│       │   ├── common/      # Shared components
│       │   └── styles/      # Component styles
│       ├── context/          # React context providers (AuthContext)
│       ├── config/           # API configuration
│       └── styles/           # Global CSS stylesheets
└── docs/                     # API Documentation
    ├── openapi.yaml          # OpenAPI specification
    └── *.md                  # Endpoint documentation
```

## 🚀 Quick Start

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **Git**
- **MySQL** (for production) or use built-in H2 database for development

### Clone the Repository
```bash
git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies and run (Windows)
.\mvnw.cmd spring-boot:run

# Install dependencies and run (Linux/Mac)
./mvnw spring-boot:run

# Or build and run the JAR
.\mvnw.cmd clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

The backend will start on http://localhost:8080 with:
- H2 in-memory database for development
- H2 Console available at http://localhost:8080/h2-console
- Swagger UI available at http://localhost:8080/swagger-ui.html
- API endpoints available at http://localhost:8080/api

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on http://localhost:3000 and automatically connect to the backend API.

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **H2 Database Console**: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:eventra)

## 🔧 Installation

### Development Environment

1. **Backend Configuration**
   The backend is pre-configured for development with H2 database. No additional setup is required for local development.

   For MySQL configuration, create `application.properties`:
   ```bash
   cd backend
   # Copy and edit the properties file if needed
   ```

2. **Environment Variables**
   The application supports environment variables for configuration:
   - `AIVEN_DATABASE_URL`: MySQL database URL
   - `AIVEN_DATABASE_USERNAME`: Database username
   - `AIVEN_DATABASE_PASSWORD`: Database password
   - `JWT_SECRET`: Secret key for JWT tokens
   - `JWT_EXPIRATION`: JWT expiration time in milliseconds
   - `CORS_ALLOWED_ORIGINS`: CORS allowed origins

3. **Frontend Configuration**
   The frontend automatically connects to `http://localhost:8080/api`. To change the API URL:
   ```bash
   # Set environment variable
   export REACT_APP_API_URL=http://your-api-url:port/api
   # Or edit src/config/api.js
   ```

### Database Setup

**Development (H2 - Default)**
- No setup required - uses in-memory H2 database
- Access console at http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:eventra`
- Username: `sa`
- Password: (empty)

**Production (MySQL)**
```properties
# application.properties
spring.datasource.url=jdbc:mysql://your-mysql-host:port/database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### Production Deployment

1. **Backend Build**
   ```bash
   cd backend
   .\mvnw.cmd clean package -Pprod
   ```

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   ```

## 📚 API Documentation

Comprehensive API documentation is available through multiple channels:

### Interactive Documentation
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

### Documentation Files
- **[API Overview](docs/README.md)** - Complete API guide
- **[Authentication](docs/authentication.md)** - User auth and JWT
- **[Events](docs/events.md)** - Event management endpoints
- **[RSVP & Attendees](docs/rsvp-attendees.md)** - Registration management
- **[Check-in](docs/checkin.md)** - QR code and check-in system
- **[Dashboards](docs/dashboards.md)** - Analytics and reporting
- **[Feedback](docs/feedback.md)** - Survey and feedback system
- **[Admin](docs/admin.md)** - Administrative operations
- **[OpenAPI Spec](docs/openapi.yaml)** - Machine-readable API spec

### API Base URLs
- **Development**: `http://localhost:8080/api`
- **Production**: `https://api.eventra.com/api`

## 🎨 Frontend Components

### Core Components
- **Hero** - Landing page hero section
- **Navbar** - Navigation and user menu with authentication state
- **Dashboard** - User dashboard with event overview and management
- **AdminDashboard** - Administrative control panel for user and event management
- **EventCreation** - Event creation and editing forms with validation

### Feature Components
- **EventsSection** - Event listing with search and filtering capabilities
- **HackathonHub** - Specialized features for hackathon management
- **ProjectGallery** - Community project showcase and collaboration
- **CollaborationHub** - Team collaboration tools and communication
- **Leaderboard** - Community rankings and recognition system

### Auth Components
- **Login/Signup** - User authentication forms with validation
- **ProtectedRoute** - Route protection middleware for authenticated routes
- **AuthContext** - Authentication state management and token handling
- **Unauthorized** - Access denied component for restricted routes

### Utility Components
- **Loading** - Loading spinner for async operations
- **ErrorMessage** - Error display component
- **SearchFilter** - Reusable search and filter component

## ⚙️ Configuration

### Backend Configuration

#### Database Configuration (Development - H2)
```properties
spring.datasource.url=jdbc:h2:mem:eventra
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.jpa.show-sql=true
```

#### Database Configuration (Production - MySQL)
```properties
spring.datasource.url=jdbc:mysql://your-aiven-host:port/database_name?useSSL=true&requireSSL=true&verifyServerCertificate=false
spring.datasource.username=your_aiven_username
spring.datasource.password=your_aiven_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

#### Security Configuration
```properties
# JWT Configuration
jwt.secret=your-secure-jwt-secret-key
jwt.expiration=86400000

# CORS Configuration
cors.allowed-origins=http://localhost:3000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
cors.allowed-headers=Origin,Content-Type,Accept,Authorization,Cache-Control,X-Requested-With
cors.allow-credentials=true
```

### Frontend Configuration

#### API Configuration
```javascript
// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Environment variable usage:
// REACT_APP_API_URL=http://your-api-url:port/api npm start
```

#### Environment Variables
- `REACT_APP_API_URL`: Backend API base URL
- `REACT_APP_DEBUG`: Enable debug mode

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- **Backend**: Follow Java conventions and Spring Boot best practices
- **Frontend**: Use ESLint and Prettier for consistent code style
- **Testing**: Write comprehensive tests for new features
- **Documentation**: Update API documentation for any changes
- **Commit Messages**: Use conventional commit messages

### Getting Started for Contributors
1. Set up the development environment as described in the Quick Start section
2. Explore the codebase structure
3. Check existing issues or propose new features
4. Follow the coding standards and testing requirements

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [https://github.com/SandeepVashishtha/Eventra](https://github.com/SandeepVashishtha/Eventra)
- **Issues**: [https://github.com/SandeepVashishtha/Eventra/issues](https://github.com/SandeepVashishtha/Eventra/issues)
- **Discussions**: [https://github.com/SandeepVashishtha/Eventra/discussions](https://github.com/SandeepVashishtha/Eventra/discussions)

## 👥 Contributors

Thanks to all the amazing people who have contributed to Eventra! 

<a href="https://github.com/SandeepVashishtha/Eventra/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SandeepVashishtha/Eventra&t=${Math.floor(Date.now() / (1000 * 60 * 60 * 24))}" alt="Contributors" />
</a>

*Contributor updates automatically every 24 hours*

### 🚀 Want to contribute?
We'd love your help! Check out our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 👥 Maintainers

- **Sandeep Vashishtha** - [@SandeepVashishtha](https://github.com/SandeepVashishtha)

---

Built with ❤️ for the community. Happy event organizing! 🎉
