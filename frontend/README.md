# Eventra Frontend

A modern React.js frontend for the Eventra event management platform. This application provides a responsive, animated user interface for managing events, user authentication, and community features.

## 📋 Overview

### Frontend Architecture

The Eventra frontend follows a component-based architecture built with React.js, utilizing modern development practices and tools for optimal performance and maintainability.

**Key Architectural Principles:**
- **Component-Based Design**: Modular, reusable components for consistent UI
- **Client-Side Routing**: Single-page application with React Router for seamless navigation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Animation-Driven UX**: Smooth transitions and interactions using Framer Motion
- **API Integration**: RESTful communication with Spring Boot backend

### Technologies Used

- **React** 18.2.0 - Modern UI library with hooks and functional components
- **React Router DOM** 6.8.0 - Declarative routing for React applications
- **Framer Motion** 8.5.2 - Production-ready motion library for React
- **React Intersection Observer** 9.4.1 - React implementation of the Intersection Observer API
- **Heroicons** 2.0.16 - Beautiful hand-crafted SVG icons
- **Create React App** - Build setup and development server
- **CSS Modules** - Component-scoped styling approach

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra/frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional for local development)
# Create .env file with:
# REACT_APP_API_URL=http://localhost:8080/api
# REACT_APP_APP_NAME=Eventra

# 4. Start development server
npm start

# 5. Open browser and navigate to http://localhost:3000

# Build for production
npm run build
```

### Development Workflow
1. **Install Dependencies**: Run `npm install` to install all required packages
2. **Environment Setup**: Configure API endpoints in `.env` file
3. **Start Development Server**: Use `npm start` for hot-reloading development
4. **Build for Production**: Run `npm run build` to create optimized production build
5. **Test Application**: Run `npm test` to execute test suite

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── favicon.ico        # App favicon
│   ├── index.html         # Main HTML template
│   └── manifest.json      # Web app manifest
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── admin/        # Admin-specific components
│   │   │   ├── AdminDashboard.css
│   │   │   └── AdminDashboard.js
│   │   ├── auth/         # Authentication components
│   │   │   ├── Auth.css
│   │   │   ├── Login.js
│   │   │   ├── PasswordReset.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Signup.js
│   │   ├── common/       # Shared/common components
│   │   │   ├── common-components.css
│   │   │   ├── ErrorMessage.js
│   │   │   ├── EventCreation.css
│   │   │   ├── EventCreation.js
│   │   │   ├── Loading.js
│   │   │   └── Unauthorized.js
│   │   ├── styles/       # Shared styling components
│   │   │   └── EventSection.css
│   │   ├── user/         # User-specific components
│   │   │   ├── UserDashboard.css
│   │   │   └── UserDashboard.js
│   │   ├── AboutPage.js
│   │   ├── CollaborationHub.js
│   │   ├── Community.js
│   │   ├── components.css
│   │   ├── Contributors.css
│   │   ├── Contributors.js
│   │   ├── Dashboard.js
│   │   ├── EventsSection.js
│   │   ├── Features.js
│   │   ├── Footer.js
│   │   ├── HackathonHub.js
│   │   ├── Hero.js
│   │   ├── Leaderboard.js
│   │   ├── Navbar.js
│   │   ├── NotFound.js
│   │   ├── ProjectGallery.js
│   │   ├── scrolltotopButton.css
│   │   ├── scrolltotopButton.js
│   │   ├── SearchFilter.js
│   │   ├── shared-layout.css
│   │   ├── Testimonials.js
│   │   └── WhatsHappening.js
│   ├── config/           # Configuration files
│   │   └── api.js       # API configuration
│   ├── context/         # React Context providers
│   │   └── AuthContext.js # Authentication context
│   ├── App.css          # Main app styles
│   ├── App.js           # Root React component
│   ├── index.css        # Global styles
│   └── index.js         # App entry point
├── package.json         # Dependencies and scripts
├── package-lock.json    # Lockfile for exact dependency versions
└── README.md           # This file
```

---

## 🎨 Components Overview

### Landing Page Components
- **Hero**: Eye-catching header with call-to-action
- **WhatsHappening**: Preview of upcoming events
- **Features**: Platform capabilities showcase
- **Testimonials**: User reviews and feedback
- **Community**: Social engagement section

### Navigation & Layout
- **Navbar**: Responsive navigation with mobile support
- **Footer**: Site footer with links and information
- **Layout**: Main application wrapper
- **PublicLayout**: Layout for public-facing pages

### Common Components
- **Loading**: Animated loading states
- **ErrorMessage**: User-friendly error display
- **Navbar**: Shared navigation component

### Authentication & User Management
- **Login**: User authentication interface
- **Register**: New user registration
- **Profile**: User profile management

### Event Management
- **CreateEvent**: Event creation interface
- **Events**: Event listing and management
- **Dashboard**: Admin and organizer dashboard

---

## 🎯 Features

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Smooth Animations**: Framer Motion powered transitions
- **Scroll Animations**: Elements animate as they come into view
- **Modern Icons**: Heroicons for consistent iconography

### Navigation
- **React Router**: Client-side routing with dynamic navigation
- **Protected Routes**: Authentication-based route protection
- **Breadcrumbs**: Clear navigation hierarchy

### Styling Architecture
- **CSS Modules**: Component-scoped styling
- **Shared Layouts**: Consistent spacing and typography
- **Responsive Grid**: Flexible layout system
- **Design System**: Consistent color palette and typography

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on `http://localhost:3000` |
| `npm build` | Create production build in `build/` directory |
| `npm test` | Run test suite with Jest |
| `npm eject` | Eject from Create React App (⚠️ irreversible) |

---

## 🌐 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/SandeepVashishtha/Eventra.git
   cd Eventra/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Environment Variables
Create a `.env` file in the frontend root:
```env
REACT_APP_API_URL=https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net/api
REACT_APP_APP_NAME=Eventra
REACT_APP_VERSION=1.0.0
```

For local development, you can use:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🎨 Styling Guidelines

### CSS Organization
- **Component Styles**: Each component has its own CSS file
- **Shared Styles**: Common styles in `shared-layout.css`
- **Global Styles**: Application-wide styles in `App.css` and `index.css`

### CSS Naming Convention
- **BEM Methodology**: Block, Element, Modifier naming
- **Component Prefixes**: Component-specific class prefixes
- **Responsive Classes**: Mobile-first responsive utilities

### Color Palette
- **Primary**: Blue tones for main actions
- **Secondary**: Complementary accent colors
- **Neutral**: Grays for text and backgrounds
- **Success/Error**: Semantic colors for feedback

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- **Touch-friendly**: Large tap targets
- **Swipe gestures**: Mobile navigation patterns
- **Optimized images**: Responsive image loading
- **Fast loading**: Optimized bundle size

---

## 🔌 API Integration

### Backend Communication
- **REST API**: HTTP requests to Spring Boot backend
- **Authentication**: JWT token management
- **Error Handling**: Graceful error states
- **Loading States**: User feedback during requests

### Data Flow
- **State Management**: React Context and hooks
- **Local Storage**: Token persistence
- **Cache Strategy**: Optimistic UI updates

---

## 🧪 Testing

### Test Structure
- **Component Tests**: Unit tests for individual components
- **Integration Tests**: User interaction flows
- **Accessibility Tests**: Screen reader compatibility

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## 🚀 Production Build

### Building for Production
```bash
npm run build
```

### Build Optimization
- **Code Splitting**: Automatic bundle splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Compressed CSS and JavaScript
- **Asset Optimization**: Optimized images and fonts

### Deployment
The build folder contains static files ready for deployment to any static hosting service:
- **Netlify**: Direct folder upload or Git integration
- **Vercel**: Automatic deployment from Git
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

---

## 🤝 Contributing

### Frontend Development Workflow

#### Getting Started with Development
1. **Set up your development environment** following the setup instructions above
2. **Fork** the repository on GitHub
3. **Clone** your fork locally: `git clone https://github.com/your-username/Eventra.git`
4. **Create** a feature branch: `git checkout -b feature/your-feature-name`
5. **Install dependencies**: `cd frontend && npm install`
6. **Start development server**: `npm start`

#### Development Best Practices

##### Component Development
- **Component Structure**: Create components in appropriate subdirectories (`admin/`, `auth/`, `common/`, `user/`)
- **File Naming**: Use PascalCase for component files (e.g., `UserDashboard.js`)
- **CSS Naming**: Use kebab-case for CSS files (e.g., `user-dashboard.css`)
- **Component Organization**: Group related components and their styles together

##### Code Standards
- **ESLint**: Follow ESLint rules for code quality
- **React Hooks**: Prefer functional components with hooks over class components
- **PropTypes**: Use PropTypes for component prop validation
- **Accessibility**: Ensure WCAG 2.1 compliance with proper ARIA labels and keyboard navigation

##### Styling Guidelines
- **CSS Modules**: Use component-scoped CSS to avoid style conflicts
- **BEM Methodology**: Follow BEM naming convention for CSS classes
- **Responsive Design**: Implement mobile-first responsive design
- **Consistent Spacing**: Use the established spacing scale from `shared-layout.css`

##### State Management
- **React Context**: Use React Context for global state management
- **Local State**: Use `useState` for component-specific state
- **Custom Hooks**: Create reusable hooks for common functionality

#### Making Changes

1. **Write clear, focused commits**:
   ```bash
   git commit -m "feat: add user profile component"
   git commit -m "fix: resolve mobile layout issue in navbar"
   git commit -m "style: update button hover effects"
   ```

2. **Test your changes**:
   - Run the development server: `npm start`
   - Test on different screen sizes
   - Verify accessibility with screen readers
   - Check console for errors

3. **Update documentation** if you add new components or change existing functionality

#### Pull Request Process

1. **Push** your changes: `git push origin feature/your-feature-name`
2. **Create** a Pull Request on GitHub
3. **Provide** a clear description of your changes
4. **Reference** any related issues
5. **Request review** from frontend maintainers

#### Pull Request Checklist
- [ ] Code follows the established patterns and conventions
- [ ] Component is properly tested (manual testing)
- [ ] Responsive design works on mobile and desktop
- [ ] No console errors or warnings
- [ ] Accessibility features are implemented
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive

#### Areas for Contribution
- **New Components**: Create reusable UI components
- **Feature Enhancements**: Improve existing functionality
- **Bug Fixes**: Resolve UI/UX issues
- **Performance Optimization**: Improve loading times and user experience
- **Accessibility Improvements**: Enhance screen reader support and keyboard navigation
- **Mobile Responsiveness**: Ensure optimal experience across all devices

#### Getting Help
- Check existing issues and pull requests for similar work
- Review the component documentation in this README
- Ask questions in GitHub discussions or issues
- Join our community channels for real-time help

---

## 📄 License

This project is part of the Eventra platform and follows the same MIT License terms.
