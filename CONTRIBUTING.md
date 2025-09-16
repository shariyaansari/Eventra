# 🤝 Contributing to Eventra 🎉

Thank you for your interest in contributing to **Eventra**!  
We’re excited to have you join us in building a modern event management platform for builders and communities.  

This document outlines the guidelines, standards, and workflow to help you make meaningful contributions.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Ways to Contribute](#-ways-to-contribute)
- [Development Workflow](#-development-workflow)
- [Code Standards](#-code-standards)
- [Frontend Guidelines](#-frontend-guidelines)
- [Backend Guidelines](#-backend-guidelines)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Getting Help](#-getting-help)

---

## 📜 Code of Conduct

We are committed to fostering a welcoming and inclusive environment.  
Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 🌟 Ways to Contribute

You can help improve Eventra in several ways:

- **Reporting Bugs** – Open an issue with detailed reproduction steps.
- **Suggesting Features** – Share ideas that can make Eventra even better.
- **Improving Documentation** – Fix typos, add missing explanations, or improve clarity.
- **Code Contributions** – Add new features, fix bugs, or improve existing code.
- **UI/UX Enhancements** – Improve the design, animations, and user experience.

---

## 🛠️ Development Workflow

1. **Fork the Repository**
   ```bash
   git fork https://github.com/SandeepVashishtha/Eventra.git
   cd Eventra
2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```
3. Make Your Changes
Follow the code standards and test your changes locally.
4. Commit Your Changes
```bash
git commit -m "feat: add amazing feature"
```
5. Push to Your Branch
```bash
git push origin feature/amazing-feature
```
6. Open a Pull Request
Submit a PR with a clear description of your changes.

## Code Standards
### Backend
- Follow Java 17 conventions
- Use Spring Boot best practices
- Maintain RESTful API design
- Update OpenAPI/Swagger docs for new endpoints
### Frontend
- Use functional components with React Hooks
- Follow modern React best practices
- Keep components small and reusable
- Ensure responsive design

### Testing
- Write unit/integration tests for new features
- Test thoroughly before submitting PRs
### Documentation
- Update the README or docs for new features
- Add inline comments for clarity
##  Frontend Guidelines
- ### Tech stack:
- React 18.2.0, React Router DOM, Framer Motion
- ### Code style:
- Use ESLint + Prettier for formatting
- Store API configs in src/config/api.js
- ### Environment:
- Configure using .env file (see .env.example)

## Backend Guidelines
- ### Tech stack:
- Java 17, Spring Boot 3.3.1, MySQL (Prod), H2 (Dev)

## Commit Message Guidelines
We follow conventional commits:
- feat: – New feature
- fix: – Bug fix
- docs: – Documentation only changes
- style: – Code style changes (formatting, missing semicolons, etc.)
- refactor: – Code changes that neither fix a bug nor add a feature
- test: – Adding or updating tests
- chore: – Maintenance tasks

### Examples:
- feat: add leaderboard component
- fix: resolve API CORS issue
- docs: update contributing guidelines

## Pull Request Process
- Ensure your PR description clearly explains:
- The problem solved
- Your approach
- Any related issues (use Closes #issue_number)
- Make sure all tests pass before submitting.
- Request a review from a maintainer.

## Getting Help
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## 🎉 Final Note
Thank you for contributing to Eventra!
Your efforts help us build a powerful and modern event management platform for everyone. 🚀
