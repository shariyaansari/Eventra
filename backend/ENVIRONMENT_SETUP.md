# Environment Configuration

This project uses environment variables to keep sensitive data secure and out of version control.

## Setup for Local Development

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual values:
   - Database credentials
   - JWT secret key
   - Other sensitive configurations

3. **Load environment variables** before running the application:

   **Windows PowerShell:**
   ```powershell
   # Load environment variables from .env file
   Get-Content .env | ForEach-Object {
       if ($_ -match '^([^=]+)=(.*)$') {
           [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
       }
   }
   
   # Then run the application
   ./mvnw spring-boot:run
   ```

   **Windows Command Prompt:**
   ```cmd
   # Set each variable manually
   set DB_URL=jdbc:mysql://your-host:port/database
   set DB_USERNAME=your-username
   set DB_PASSWORD=your-password
   set JWT_SECRET=your-jwt-secret
   
   # Then run the application
   mvnw spring-boot:run
   ```

   **Linux/Mac:**
   ```bash
   # Export environment variables
   export $(cat .env | xargs)
   
   # Then run the application
   ./mvnw spring-boot:run
   ```

## Running with Different Profiles

### Development Profile (default)
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Production Profile
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_URL` | Database connection URL | `jdbc:h2:mem:testdb` | No |
| `DB_USERNAME` | Database username | `sa` | No |
| `DB_PASSWORD` | Database password | (empty) | No |
| `DB_DRIVER` | Database driver class | `org.h2.Driver` | No |
| `DB_DIALECT` | Hibernate dialect | `org.hibernate.dialect.H2Dialect` | No |
| `JWT_SECRET` | JWT signing secret | `defaultSecretForDevelopmentOnly` | Yes (for production) |
| `JWT_EXPIRATION` | JWT expiration time in milliseconds | `86400000` (24 hours) | No |

## Security Notes

- Never commit the `.env` file to version control
- Use strong, unique passwords and secrets in production
- The default values are only suitable for development
- In production, always provide environment variables through your deployment platform

## Deployment

For production deployment, set environment variables through your hosting platform:

- **Railway:** Set environment variables in the Railway dashboard
- **Heroku:** Use `heroku config:set VARIABLE_NAME=value`
- **Docker:** Use `-e` flag or environment file
- **AWS/Azure/GCP:** Use their respective environment variable systems
