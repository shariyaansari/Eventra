# Frontend Integration with Bump.sh API Documentation

This guide shows how to integrate your Vercel-deployed frontend with the Bump.sh API documentation.

## 🌐 Frontend-Backend Architecture

- **Backend**: Deployed on Azure (Spring Boot API)
- **Frontend**: Deployed on Vercel (React Application)
- **API Docs**: Hosted on Bump.sh with automatic updates

## 🔗 Integration Points

### 1. API Base URL Configuration

In your React app, configure the API base URL for different environments:

```javascript
// src/config/api.js
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://eventra-backend.azurewebsites.net', // Your Azure URL
    timeout: 15000,
  }
};

export const getApiConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  return API_CONFIG[environment];
};
```

### 2. Documentation Links

Add links to your Bump.sh documentation in your frontend:

```javascript
// In your developer documentation or help section
const API_DOCS_URL = 'https://bump.sh/your-hub-name/doc/eventra-api';

// Component example
const ApiDocumentationLink = () => (
  <a 
    href={API_DOCS_URL} 
    target="_blank" 
    rel="noopener noreferrer"
    className="api-docs-link"
  >
    📚 View API Documentation
  </a>
);
```

### 3. Environment Variables for Vercel

Create these environment variables in your Vercel dashboard:

```env
# Vercel Environment Variables
REACT_APP_API_BASE_URL=https://eventra-backend.azurewebsites.net
REACT_APP_API_DOCS_URL=https://bump.sh/your-hub-name/doc/eventra-api
REACT_APP_ENVIRONMENT=production
```

### 4. Automatic API Testing

Create a workflow that tests the frontend against the documented API:

```yaml
# .github/workflows/frontend-api-test.yml
name: Test Frontend Against API

on:
  push:
    branches: [ main, master ]
    paths:
      - 'frontend/**'
  workflow_dispatch:

jobs:
  test-integration:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      working-directory: frontend
      run: npm ci
    
    - name: Test API connectivity
      working-directory: frontend
      run: |
        npm run test:api
      env:
        REACT_APP_API_BASE_URL: https://eventra-backend.azurewebsites.net
```

## 🚀 Deployment Flow

1. **Backend Changes** → Azure deployment → OpenAPI spec updated → Bump.sh docs updated
2. **Frontend Changes** → Vercel deployment → Uses updated API documentation
3. **API Documentation** → Always reflects the current Azure deployment

## 📱 Mobile-Friendly Documentation

Your Bump.sh documentation is automatically mobile-friendly, making it easy for developers to reference the API while working on mobile apps or responsive features.

## 🔧 Troubleshooting

### CORS Issues
Make sure your Azure backend allows requests from your Vercel domain:

```java
// In your Spring Boot configuration
@CrossOrigin(origins = {
    "http://localhost:3000",           // Local development
    "https://your-app.vercel.app",     // Vercel production
    "https://your-custom-domain.com"   // Custom domain
})
```

### API Version Mismatches
Use the Bump.sh changelog feature to track API changes and update your frontend accordingly.
