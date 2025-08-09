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
- **Database**: MySQL (Aiven) with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven
- **Documentation**: OpenAPI 3.0

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **Animations**: Framer Motion 8.5.2
- **Icons**: Heroicons React 2.0.16
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
│   │   ├── config/            # Configuration classes
│   │   ├── controller/        # REST API controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA entities
│   │   ├── service/          # Business logic
│   │   ├── repository/       # Data access layer
│   │   └── exception/        # Custom exceptions
│   └── src/main/resources/    # Configuration files
├── frontend/                  # React Web Application
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # React components
│       ├── context/          # React context providers
│       ├── config/           # API configuration
│       └── styles/           # CSS stylesheets
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

### Clone the Repository
```bash
git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Run with Maven (Windows)
.\mvnw.cmd spring-boot:run

# Run with Maven (Linux/Mac)
./mvnw spring-boot:run

# Or build and run the JAR
.\mvnw.cmd clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 🔧 Installation

### Development Environment

1. **Backend Configuration**
   ```bash
   cd backend
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```
   Edit `application.properties` with your database and security configurations.

2. **Environment Profiles**
   - `application-dev.properties` - Development settings
   - `application-prod.properties` - Production settings
   - `application-azure.properties` - Azure deployment settings

3. **Frontend Configuration**
   ```bash
   cd frontend
   # Update API endpoints in src/config/api.js
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

Comprehensive API documentation is available in the `/docs` directory:

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
- **Navbar** - Navigation and user menu
- **Dashboard** - User dashboard with event overview
- **AdminDashboard** - Administrative control panel
- **EventCreation** - Event creation and editing forms

### Feature Components
- **EventsSection** - Event listing and search
- **HackathonHub** - Hackathon-specific features
- **ProjectGallery** - Community project showcase
- **CollaborationHub** - Team collaboration tools
- **Leaderboard** - Community rankings and recognition

### Auth Components
- **Login/Signup** - User authentication
- **ProtectedRoute** - Route protection middleware
- **AuthContext** - Authentication state management

## ⚙️ Configuration

### Backend Configuration

#### Database Configuration
```properties
# application.properties - Aiven MySQL
spring.datasource.url=jdbc:mysql://your-aiven-host:port/database_name?useSSL=true&requireSSL=true&verifyServerCertificate=false
spring.datasource.username=your_aiven_username
spring.datasource.password=your_aiven_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

#### Security Configuration
```properties
# JWT Configuration
jwt.secret=your-jwt-secret-key
jwt.expiration=86400000
```

### Frontend Configuration

#### API Configuration
```javascript
// src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.eventra.com/api'
  : 'http://localhost:8080/api';
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow Java conventions for backend code
- Use ESLint and Prettier for frontend code
- Write comprehensive tests for new features
- Update documentation for API changes

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
