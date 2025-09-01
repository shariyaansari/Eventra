# Eventra 🎉

**A Modern Event Management Platform for Builders and Communities**

Eventra is a comprehensive event management system that empowers organizers to create, manage, and track events seamlessly. Built with a modern tech stack featuring React frontend and Spring Boot backend, Eventra provides everything needed to run successful events from creation to post-event analytics.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

## 🌐 Live Demo

- **Frontend**: [https://eventra-psi.vercel.app/](https://eventra-psi.vercel.app/)
- **Backend API**: [https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net)
- **API Documentation**: [Backend Swagger UI](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/swagger-ui.html)


<h2 id="project-insights">📊 Project Insights</h2>

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/SandeepVashishtha/Eventra?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/SandeepVashishtha/Eventra?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/SandeepVashishtha/Eventra?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/SandeepVashishtha/Eventra?style=flat&logo=github"/></td>
            <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/SandeepVashishtha/Eventra?style=flat&color=critical&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/SandeepVashishtha/Eventra?style=flat&color=green&logo=github"></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/SandeepVashishtha/Eventra?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>
## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Frontend Components](#-frontend-components)
- [Troubleshooting](#-troubleshooting)
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
├── .github/                   # GitHub workflows and templates
├── .vscode/                   # VS Code settings
├── backend/                   # Spring Boot API Server
│   ├── src/main/java/com/eventra/
│   │   ├── config/            # Configuration classes
│   │   │   ├── CorsConfig.java           # CORS configuration
│   │   │   └── OpenApiConfig.java        # Swagger/OpenAPI setup
│   │   ├── controller/        # REST API controllers
│   │   │   ├── AdminController.java      # Admin management
│   │   │   ├── AuthController.java       # Authentication endpoints
│   │   │   ├── EventController.java      # Event management
│   │   │   ├── HealthController.java     # Health check endpoint
│   │   │   ├── HomeController.java       # Home page endpoint
│   │   │   └── UserController.java       # User management
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── entity/            # JPA entities
│   │   │   ├── User.java                 # User entity
│   │   │   ├── Event.java                # Event entity
│   │   │   └── Project.java              # Project entity
│   │   ├── exception/         # Custom exceptions
│   │   ├── filter/            # Security filters
│   │   ├── repository/        # Data access layer (JPA repositories)
│   │   ├── service/           # Business logic services
│   │   ├── util/              # Utility classes (JWT, validation)
│   │   ├── BackendApplication.java       # Main Spring Boot application
│   │   ├── SecurityConfig.java          # Security configuration
│   │   └── StatusController.java        # Status endpoint
│   ├── src/main/resources/    # Configuration files
│   │   ├── application.properties        # Main configuration
│   │   ├── application-dev.properties    # Development settings
│   │   ├── application-mysql.properties  # MySQL configuration
│   │   ├── application-prod.properties   # Production settings
│   │   └── application-azure.properties  # Azure deployment config
│   ├── src/test/java/         # Test files
│   ├── target/                # Build output
│   ├── azure-cors-variables.json        # Azure CORS environment variables
│   ├── azure-environment-variables.json # Azure deployment variables
│   ├── CLEANUP_SUMMARY.md               # Database cleanup documentation
│   ├── DATABASE_MIGRATION.md            # Database migration guide
│   ├── DEPLOYMENT_GUIDE.md              # Backend deployment guide
│   ├── update-azure-cors.sh             # Azure CORS update script
│   ├── mvnw / mvnw.cmd                   # Maven wrapper
│   └── pom.xml                          # Maven configuration
├── frontend/                  # React Web Application
│   ├── public/                # Static assets
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── admin/         # Admin dashboard components
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   └── AdminDashboard.css
│   │   │   ├── auth/          # Authentication components
│   │   │   │   ├── Auth.css
│   │   │   │   ├── Login.js
│   │   │   │   ├── PasswordReset.js
│   │   │   │   ├── ProtectedRoute.js
│   │   │   │   ├── Signup.js
│   │   │   │   └── Unauthorized.js
│   │   │   ├── common/        # Shared components
│   │   │   │   ├── common-components.css
│   │   │   │   ├── ErrorMessage.js
│   │   │   │   ├── EventCreation.js
│   │   │   │   ├── EventCreation.css
│   │   │   │   └── Loading.js
│   │   │   ├── Layout/        # Layout components
│   │   │   │   ├── Footer.js
│   │   │   │   └── Navbar.js
│   │   │   ├── styles/        # Component-specific styles
│   │   │   │   ├── components.css
│   │   │   │   ├── Contributors.css
│   │   │   │   ├── notFound.css
│   │   │   │   └── scrolltotopButton.css
│   │   │   ├── user/          # User-specific components
│   │   │   ├── CollaborationHub.js       # Collaboration features
│   │   │   ├── Contributors.js           # Contributors display
│   │   │   ├── Dashboard.js              # Main dashboard
│   │   │   ├── GitHubStats.jsx           # GitHub statistics
│   │   │   ├── Leaderboard.js            # User leaderboard
│   │   │   ├── NotFound.js               # 404 page
│   │   │   ├── ScrollToTop.js            # Scroll to top button
│   │   │   └── SearchFilter.js           # Search and filter
│   │   ├── config/            # Configuration files
│   │   │   └── api.js                    # API endpoints and utilities
│   │   ├── context/           # React context providers
│   │   │   └── AuthContext.js            # Authentication context
│   │   ├── Pages/             # Page components
│   │   │   ├── About/                    # About page
│   │   │   ├── Events/                   # Events pages
│   │   │   ├── Hackathons/               # Hackathons section
│   │   │   ├── Home/                     # Home page
│   │   │   └── Projects/                 # Projects section
│   │   ├── App.js             # Main App component
│   │   ├── App.css            # Global app styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global CSS styles
│   ├── .env.example           # Environment variables template
│   ├── .env.production        # Production environment config
│   ├── CSS-CONSOLIDATION-SUMMARY.md     # CSS consolidation notes
│   ├── package.json           # npm dependencies
│   └── README.md              # Frontend documentation
├── docs/                      # Project documentation
│   ├── admin.md               # Admin functionality docs
│   ├── authentication.md     # Authentication documentation
│   ├── CHANGELOG.md           # Version history
│   ├── checkin.md             # Check-in process docs
│   ├── dashboards.md          # Dashboard documentation
│   ├── errors.md              # Error handling docs
│   ├── events.md              # Events API documentation
│   ├── feedback.md            # Feedback system docs
│   ├── frontend-integration.md # Frontend integration guide
│   ├── index.md               # Documentation index
│   ├── openapi.yaml           # OpenAPI specification
│   ├── README.md              # Documentation README
│   └── rsvp-attendees.md      # RSVP and attendee management
├── .gitignore                 # Git ignore rules
├── CODE_OF_CONDUCT.md         # Code of conduct
├── CONTRIBUTING.md            # Contributing guidelines
├── DEPLOYMENT_TROUBLESHOOTING.md # Deployment troubleshooting guide
├── LICENSE                    # Apache 2.0 license
├── package.json               # Root package configuration
├── package-lock.json          # npm lock file
├── README.md                  # Main project documentation
└── vercel.json                # Vercel deployment configuration
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

## 🔧 Environment Configuration

### Backend Environment Variables

For production deployment, configure these environment variables:

```bash
# Database Configuration (Aiven MySQL)
AIVEN_DATABASE_URL=jdbc:mysql://your-host:port/database?useSSL=true
AIVEN_DATABASE_USERNAME=your_username
AIVEN_DATABASE_PASSWORD=your_password
DATABASE_DRIVER=com.mysql.cj.jdbc.Driver
DATABASE_DIALECT=org.hibernate.dialect.MySQL8Dialect
DDL_AUTO=update

# Security Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRATION=86400000

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://eventra-psi.vercel.app
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS,PATCH
CORS_ALLOWED_HEADERS=*
CORS_ALLOW_CREDENTIALS=true

# Application Settings
SHOW_SQL=false
LOG_LEVEL=INFO
```

### Frontend Environment Variables

Create `.env.production` in the frontend directory:

```bash
# Production API Configuration
REACT_APP_API_URL=https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/api
REACT_APP_APP_NAME=Eventra
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
```

## 🚀 Deployment

### Backend Deployment (Azure App Service)

1. **Build the application**:
   ```bash
   cd backend
   ./mvnw clean package -DskipTests
   ```

2. **Deploy to Azure**:
   - Upload the JAR file from `target/` directory
   - Configure environment variables in Azure App Service
   - Set the startup command: `java -jar /home/site/wwwroot/backend-0.0.1-SNAPSHOT.jar`

3. **Environment Variables in Azure**:
   Use the JSON format from `backend/azure-cors-variables.json` to configure CORS settings.

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   - Import your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `build`

2. **Environment Variables in Vercel**:
   ```
   REACT_APP_API_URL = https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/api
   ```

## 📚 API Documentation

### Available Endpoints

The backend provides a comprehensive REST API documented with OpenAPI 3.0:

- **Live API Documentation**: [Swagger UI](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/swagger-ui.html)
- **OpenAPI Specification**: [API Docs](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/api-docs)

### Key API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification

#### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get event details
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `POST /api/events/{id}/join` - Join event
- `DELETE /api/events/{id}/leave` - Leave event

#### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/update` - Update user profile
- `GET /api/user/events` - Get user's events

#### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/users` - Manage users
- `GET /api/admin/events` - Manage events

## 🛠️ Troubleshooting

### Common Issues

#### 1. Network Error During Login
**Problem**: "Network error. Please check your connection and try again."

**Solution**:
1. Verify backend is running: Visit [backend health endpoint](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/api/health)
2. Check CORS configuration in Azure App Service
3. Verify `REACT_APP_API_URL` environment variable in Vercel

#### 2. CORS Issues
**Problem**: Browser console shows CORS errors

**Solution**:
1. Add these environment variables to Azure App Service:
   ```
   CORS_ALLOWED_ORIGINS = *
   CORS_ALLOWED_METHODS = GET,POST,PUT,DELETE,OPTIONS,PATCH
   CORS_ALLOWED_HEADERS = *
   CORS_ALLOW_CREDENTIALS = true
   ```
2. Restart the Azure App Service
3. Clear browser cache

#### 3. Database Connection Issues
**Problem**: Backend fails to start or connect to database

**Solution**:
1. Verify database environment variables in Azure
2. Check database connectivity and credentials
3. Ensure database server allows connections from Azure IP ranges

#### 4. Build Failures
**Problem**: Vercel build fails with schema validation errors

**Solution**:
1. Check `vercel.json` configuration
2. Ensure all required environment variables are set
3. Verify `package.json` dependencies

### Development Tips

1. **Local Development**: Use H2 database for quick setup
2. **API Testing**: Use the built-in Swagger UI for testing endpoints
3. **Debugging**: Enable SQL logging with `SHOW_SQL=true`
4. **Frontend Development**: Start backend first, then frontend

### Getting Help

1. Check the [Deployment Troubleshooting Guide](DEPLOYMENT_TROUBLESHOOTING.md)
2. Review browser console for specific error messages
3. Check Azure App Service logs for backend errors
4. Verify environment variables in both Vercel and Azure

## 🤝 Contributing

We welcome contributions to Eventra! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow Java coding conventions for backend development
- Use React best practices for frontend development
- Write meaningful commit messages
- Update documentation for any new features
- Test thoroughly before submitting PRs

### Code Structure

- **Backend**: Follow Spring Boot conventions and package structure
- **Frontend**: Use functional components with hooks
- **API**: Maintain RESTful design principles
- **Documentation**: Update OpenAPI specifications for new endpoints

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot community for excellent framework and documentation
- React community for powerful frontend library
- Azure and Vercel for reliable cloud hosting
- Aiven for managed MySQL database service

---

**Built with ❤️ by the Eventra Team**

For more information, visit our [live application](https://eventra-psi.vercel.app/) or check out the [API documentation](https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/swagger-ui.html).

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

<h2 id="contribution-guidelines">🤝👤 Contributers</h2>

We love our contributors! If you'd like to help, please check out our [`CONTRIBUTE.md`](https://github.com/SandeepVashishtha/Eventra/blob/master/CONTRIBUTING.md) file for guidelines.

>Thank you once again to all our contributors who has contributed to **AlgoVisualizer!** Your efforts are truly appreciated. 💖👏

<!-- Contributors badge (auto-updating) -->

[![Contributors](https://img.shields.io/github/contributors/SandeepVashishtha/Eventra?style=for-the-badge)](https://github.com/SandeepVashishtha/Eventra/graphs/contributors)

<!-- Contributors avatars (auto-updating) -->
<p align="left">
  <a href="https://github.com/SandeepVashishtha/Eventra/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=SandeepVashishtha/Eventra" alt="Contributors" />
  </a>
</p>

See the full list of contributors and their contributions on the [`GitHub Contributors Graph`](https://github.com/SandeepVashishtha/Eventra/graphs/contributors).

*Contributor updates automatically every 24 hours*

### 🚀 Want to contribute?
We'd love your help! Check out our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 👥 Maintainers

- **Sandeep Vashishtha** - [@SandeepVashishtha](https://github.com/SandeepVashishtha)

---

Built with ❤️ for the community. Happy event organizing! 🎉
