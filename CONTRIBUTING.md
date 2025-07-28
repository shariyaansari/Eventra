# Contributing to Eventra

Welcome to Eventra! We're excited that you want to contribute to our open-source event management platform. This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)
- [Communication](#communication)

---

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please treat all contributors with respect and create a welcoming environment for everyone.

### Our Standards

- **Be respectful**: Treat everyone with kindness and respect
- **Be inclusive**: Welcome newcomers and help them learn
- **Be collaborative**: Work together and share knowledge
- **Be constructive**: Provide helpful feedback and suggestions

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Java** 11 or higher
- **Maven** 3.6+
- **MySQL** 8.0+
- **Git**

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/sandeepvashishtha/Eventra.git
   cd Eventra
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/SandeepVashishtha/Eventra.git
   ```

---

## 🛠️ Development Setup

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
2. Update `backend/src/main/resources/application.properties` with your credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/eventra
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

---

## 📁 Project Structure

```
Eventra/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Shared components
│   │   │   └── *.js         # Feature-specific components
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Spring Boot backend
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Configuration files
│   └── pom.xml
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

### Frontend Architecture

- **Components**: Organized by feature and reusability
- **Pages**: Top-level page components
- **Styling**: CSS modules with shared layouts
- **State**: React hooks and context for state management

### Backend Architecture

- **Controllers**: REST API endpoints
- **Services**: Business logic layer
- **Repositories**: Data access layer
- **Models**: Entity classes

---

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- **feature/**: New features (`feature/event-creation`)
- **bugfix/**: Bug fixes (`bugfix/login-validation`)
- **hotfix/**: Critical fixes (`hotfix/security-patch`)
- **docs/**: Documentation (`docs/api-documentation`)
- **refactor/**: Code refactoring (`refactor/user-service`)

### Commit Message Format

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(frontend): add event creation form
fix(backend): resolve authentication token expiry
docs(readme): update installation instructions
```

### Development Process

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following coding standards

3. **Test your changes** thoroughly

4. **Commit your changes** with descriptive messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

---

## 💻 Coding Standards

### Frontend (React.js)

#### JavaScript/JSX Standards
- Use **functional components** with hooks
- Follow **ES6+** syntax and features
- Use **destructuring** for props and state
- Implement **proper error boundaries**

#### Component Guidelines
```jsx
// Good: Functional component with hooks
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependency]);

  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

#### Styling Guidelines
- Use **CSS modules** for component-specific styles
- Follow **BEM naming convention**
- Use **shared-layout.css** for common styles
- Implement **responsive design** (mobile-first)

```css
/* ComponentName.css */
.component-name {
  /* Styles */
}

.component-name__element {
  /* Element styles */
}

.component-name__element--modifier {
  /* Modified element styles */
}
```

### Backend (Spring Boot)

#### Java Standards
- Use **Spring Boot annotations** appropriately
- Follow **RESTful API** conventions
- Implement **proper exception handling**
- Use **dependency injection**

#### Code Structure
```java
@RestController
@RequestMapping("/api/v1/events")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        // Implementation
    }
}
```

---

## 🧪 Testing Guidelines

### Frontend Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

#### Test Structure
- **Unit tests**: Individual component testing
- **Integration tests**: Component interaction testing
- **Accessibility tests**: Screen reader compatibility

```jsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

test('renders component correctly', () => {
  render(<ComponentName />);
  const element = screen.getByText(/expected text/i);
  expect(element).toBeInTheDocument();
});
```

### Backend Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=EventControllerTest
```

---

## 📝 Submitting Changes

### Before Submitting

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all tests** and ensure they pass

3. **Check code formatting** and style

4. **Update documentation** if needed

### Pull Request Checklist

- [ ] Branch is up to date with main
- [ ] All tests pass
- [ ] Code follows project standards
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No merge conflicts

---

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, versions)
- **Screenshots** or error messages if applicable

### Feature Requests

For new features, provide:

- **Clear description** of the feature
- **Use case** and motivation
- **Proposed solution** or implementation ideas
- **Alternatives considered**

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

---

## 🔍 Pull Request Process

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Approval** and merge

### Merge Criteria

- All tests pass
- Code review approved
- No merge conflicts
- Documentation updated
- Follows coding standards

---

## 💬 Communication

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Code Comments**: For implementation questions

### Community Guidelines

- Be respectful and constructive
- Help others learn and grow
- Share knowledge and resources
- Follow project guidelines

---

## 🎯 Areas for Contribution

### Frontend
- UI/UX improvements
- Component development
- Animation and interactions
- Accessibility enhancements
- Performance optimizations

### Backend
- API endpoint development
- Database optimization
- Security improvements
- Performance enhancements
- Integration features

### Documentation
- Code documentation
- User guides
- API documentation
- Tutorial creation

### Testing
- Unit test coverage
- Integration tests
- End-to-end testing
- Performance testing

---

## 🏆 Recognition

Contributors will be recognized in:
- GitHub contributor list
- Project documentation
- Release notes
- Community highlights

---

## 📚 Resources

### Learning Resources
- [React Documentation](https://reactjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Tools
- [GitHub Desktop](https://desktop.github.com/) - Git GUI
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Postman](https://www.postman.com/) - API testing

---

## ❓ Questions?

If you have any questions not covered in this guide, feel free to:
- Open an issue with the `question` label
- Start a discussion in GitHub Discussions
- Reach out to maintainers

Thank you for contributing to Eventra! 🎉
