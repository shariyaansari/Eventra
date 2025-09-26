# Eventra 🎉

**A Modern Event Management Platform for Builders and Communities**

Eventra is a comprehensive event management system that empowers organizers to create, manage, and track events seamlessly. Built with a modern tech stack featuring React frontend and Spring Boot backend, Eventra provides everything needed to run successful events from creation to post-event analytics.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

## 🌐 Live Demo

- **Frontend**: [https://eventra-psi.vercel.app/](https://eventra-psi.vercel.app/)
- **Backend Repo**: https://github.com/SandeepVashishtha/Eventra-Backend
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
- [Deployment](#-deployment)
- [Frontend Components](#-frontend-components)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Event Creation & Management** - Create and customize events with rich details
- **User Authentication & Authorization** - Secure JWT-based authentication system
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
- **Version Control**: Git with comprehensive documentation
- **Deployment**: Vercel for frontend hosting

## 🏗️ Architecture

```
Eventra/
├── .github/                   # GitHub workflows and templates
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                       # React source code
│   ├── components/            # React components
│   │   ├── admin/             # Admin dashboard components
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminDashboard.css
│   │   ├── auth/              # Authentication components
│   │   │   ├── Auth.css
│   │   │   ├── Login.js
│   │   │   ├── PasswordReset.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Signup.js
│   │   │   └── Unauthorized.js
│   │   ├── common/            # Shared components
│   │   │   ├── common-components.css
│   │   │   ├── ErrorMessage.js
│   │   │   ├── EventCreation.js
│   │   │   ├── EventCreation.css
│   │   │   ├── Loading.js
│   │   │   ├── ProjectSubmission.js
│   │   │   └── ProjectSubmission.css
│   │   ├── Layout/            # Layout components
│   │   │   ├── Footer.js
│   │   │   └── Navbar.js
│   │   ├── styles/            # Component-specific styles
│   │   │   ├── components.css
│   │   │   ├── Contributors.css
│   │   │   ├── notFound.css
│   │   │   ├── scrolltotopButton.css
│   │   │   └── shared-layout.css
│   │   ├── user/              # User-specific components
│   │   │   ├── UserDashboard.css
│   │   │   └── UserDashboard.js
│   │   ├── CollaborationHub.js       # Collaboration features
│   │   ├── Contributors.js           # Contributors display
│   │   ├── Dashboard.js              # Main dashboard
│   │   ├── NotFound.js               # 404 page
│   │   ├── ScrollToTop.js            # Scroll to top button
│   │   └── SearchFilter.js           # Search and filter
│   ├── config/                # Configuration files
│   │   └── api.js                    # API endpoints and utilities
│   ├── context/               # React context providers
│   │   └── AuthContext.js            # Authentication context
│   ├── Pages/                 # Page components
│   │   ├── About/             # About page components
│   │   │   ├── AboutPage.js
│   │   │   ├── Features.js
│   │   │   ├── MissionVision.js
│   │   │   └── ModernAbout.js
│   │   ├── Contact/           # Contact page
│   │   │   └── ContactUs.js
│   │   ├── Events/            # Events pages
│   │   │   ├── eventsMockData.json
│   │   │   └── EventsPage.js
│   │   ├── Hackathons/        # Hackathons section
│   │   │   ├── HackathonHero.js
│   │   │   ├── hackathonMockData.json
│   │   │   └── HackathonPage.js
│   │   ├── Home/              # Home page
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   │       ├── Community.js
│   │   │       ├── Features.js
│   │   │       ├── GitHubStats.jsx
│   │   │       ├── Hero.js
│   │   │       ├── Testimonials.js
│   │   │       └── WhatsHappening.js
│   │   ├── Leaderboard/       # Leaderboard page
│   │   │   └── Leaderboard.jsx
│   │   └── Projects/          # Projects section
│   │       ├── mockProjectsData.json
│   │       ├── ProjectHero.js
│   │       └── ProjectsPage.js
│   ├── App.js                 # Main App component
│   ├── App.css                # Global app styles
│   ├── index.js               # React entry point
│   └── index.css              # Global CSS styles
├── build/                     # Production build output
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── LICENSE                    # Apache 2.0 license
├── package.json               # npm dependencies and scripts
├── package-lock.json          # npm lock file
├── README.md                  # Project documentation
└── vercel.json                # Vercel deployment configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 16** or higher
- **npm** or **yarn**
- **Git**

### Clone the Repository
```bash
git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Configuration

### Frontend Environment Variables

Create `.env` in the project root:

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_APP_NAME=Eventra
REACT_APP_VERSION=1.0.0
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   - Import your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `build`
2. **Set Environment Variables** in Vercel dashboard:
   - `REACT_APP_API_URL`: URL of your backend API

## 📱 Frontend Components

### Key Components

#### Pages
- **HomePage** - Landing page with hero section and features
- **AboutPage** - Information about the platform and mission
- **EventsPage** - Browse and manage events
- **HackathonPage** - Specialized hackathon management
- **ProjectsPage** - Project gallery and submissions
- **ContactUs** - Contact form and information
- **Leaderboard** - User rankings and achievements

#### Authentication
- **Login/Signup** - User authentication system
- **ProtectedRoute** - Route protection for authenticated users
- **AuthContext** - React context for authentication state

#### Dashboard Components
- **UserDashboard** - Personalized user interface
- **AdminDashboard** - Administrative controls and analytics

#### Common Components
- **Navbar** - Navigation header
- **Footer** - Site footer
- **Loading** - Loading indicators
- **ErrorMessage** - Error display component
- **ScrollToTop** - Scroll to top functionality

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork the repository**
2. **Create a feature branch**:
   ```
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:

```git commit -m "Add some amazing feature"```

4. **Push to your branch**:
```git push origin feature/amazing-feature```

5. **Open a Pull Request**

### ⚡ Issue Assignment Automation

This repository has automated issue management:
- Issues are automatically unassigned after **7 days** if no PR is opened
- Open a draft PR to maintain your assignment
- See [Auto-unassign Documentation](.github/AUTO_UNASSIGN.md) for details

## Development Guidelines

1. Follow Java coding conventions for backend
2. Follow React best practices for frontend
3. Write meaningful commit messages
4. Update documentation for new features
5. Test thoroughly before submitting PRs
6. **Open PRs within 7 days** of issue assignment to avoid auto-unassignment

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
- **[Dashboards](docs/dashboards.md)** - Analytics and reporting
- **[Feedback](docs/feedback.md)** - Survey and feedback system
- **[Admin](docs/admin.md)** - Administrative operations
- **[OpenAPI Spec](docs/openapi.yaml)** - Machine-readable API spec

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

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### ⏰ Assignment Policy
- Issues are **auto-unassigned after 7 days** without PR activity
- Open a draft PR to keep your assignment
- See detailed info: [Auto-unassign Guide](.github/AUTO_UNASSIGN.md)

### Code Standards
- **Backend**: Follow Java conventions and Spring Boot best practices
- **Frontend**: Use ESLint and Prettier for consistent code style
- **Testing**: Write comprehensive tests for new features
- **Documentation**: Update API documentation for any changes
- **Commit Messages**: Use conventional commit messages
- **Timeline**: Open PRs within 7 days of assignment to avoid auto-unassignment

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

<h2 id="contribution-guidelines">🤝👤 Contributors</h2>

We love our contributors! If you'd like to help, please check out the development workflow above for guidelines.

>Thank you once again to all our contributors who has contributed to **Eventra!** Your efforts are truly appreciated. 💖👏

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
We'd love your help! Follow the development workflow and code standards outlined above to get started.

## 👥 Maintainers

- **Sandeep Vashishtha** - [@SandeepVashishtha](https://github.com/SandeepVashishtha)

---

Crafted with ❤️ for our amazing community. Let the events begin and the celebrations flow! 🎉
