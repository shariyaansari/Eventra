# Eventra Frontend

A modern React.js frontend for the Eventra event management platform. This application provides a responsive, animated user interface for managing events, user authentication, and community features.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SandeepVashishtha/Eventra.git
cd Eventra/frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

---

## 🛠️ Tech Stack

- **React** 18.2.0 - Modern UI library with hooks
- **React Router DOM** 6.8.0 - Client-side routing
- **Framer Motion** 8.5.2 - Smooth animations and transitions
- **React Intersection Observer** 9.4.1 - Scroll-based animations
- **Heroicons** 2.0.16 - Beautiful SVG icons

---

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── common/             # Shared components
│   │   ├── ErrorMessage.js # Error handling component
│   │   ├── Loading.js      # Loading state component
│   │   ├── Layout.js       # Main layout wrapper
│   │   ├── Navbar.js       # Navigation component
│   │   └── PublicLayout.js # Public pages layout
│   ├── Community.js        # Community section component
│   ├── Features.js         # Features showcase
│   ├── Footer.js           # Footer component
│   ├── Hero.js             # Landing page hero section
│   ├── Navbar.js           # Main navigation
│   ├── Testimonials.js     # User testimonials
│   └── WhatsHappening.js   # Events preview section
├── pages/                  # Page-level components
│   ├── CreateEvent.css     # Create event page styles
│   ├── Dashboard.css       # Dashboard styles
│   ├── DevfolioHomePage.js # Devfolio integration page
│   ├── Events.css          # Events page styles
│   ├── Feedback.css        # Feedback page styles
│   ├── Home.js             # Main landing page
│   ├── Login.js            # Authentication page
│   ├── Profile.css         # User profile styles
│   └── Register.css        # Registration styles
├── App.js                  # Main application component
├── App.css                 # Global application styles
├── index.js                # Application entry point
└── index.css               # Global CSS styles
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

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **React Hooks**: Functional components preferred
- **Accessibility**: WCAG 2.1 compliance

---

## 📄 License

This project is part of the Eventra platform and follows the same MIT License terms.
