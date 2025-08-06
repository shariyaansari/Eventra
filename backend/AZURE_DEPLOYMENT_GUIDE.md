# Azure Production Deployment Guide

This guide will help you deploy your Eventra backend application to Microsoft Azure.

## Prerequisites

1. **Azure Account**: You need an active Azure subscription
2. **Azure CLI**: Install from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
3. **Maven**: Should already be available via `./mvnw`
4. **Java 17**: Required for the application

## 🚀 Quick Deployment Steps

### Step 1: Login to Azure
```powershell
az login
```

### Step 2: Create Azure Resources
```powershell
# Set variables
$resourceGroup = "eventra-rg"
$location = "East US"
$appName = "eventra-backend-app"
$mysqlServer = "eventra-mysql-server"
$mysqlDatabase = "eventra"

# Create resource group
az group create --name $resourceGroup --location $location

# Create Azure Database for MySQL Flexible Server
az mysql flexible-server create `
  --resource-group $resourceGroup `
  --name $mysqlServer `
  --location $location `
  --admin-user eventramysql `
  --admin-password "YourSecurePassword123!" `
  --sku-name Standard_B1ms `
  --tier Burstable `
  --public-access 0.0.0.0 `
  --storage-size 20 `
  --version 8.0

# Create database
az mysql flexible-server db create `
  --resource-group $resourceGroup `
  --server-name $mysqlServer `
  --database-name $mysqlDatabase

# Create App Service Plan
az appservice plan create `
  --name eventra-app-plan `
  --resource-group $resourceGroup `
  --location $location `
  --sku B1 `
  --is-linux

# Create App Service
az webapp create `
  --name $appName `
  --resource-group $resourceGroup `
  --plan eventra-app-plan `
  --runtime "JAVA:17-java17"
```

### Step 3: Configure Environment Variables
```powershell
# Set application settings
az webapp config appsettings set `
  --resource-group $resourceGroup `
  --name $appName `
  --settings `
    SPRING_PROFILES_ACTIVE=azure `
    AZURE_MYSQL_CONNECTIONSTRING="jdbc:mysql://$mysqlServer.mysql.database.azure.com:3306/$mysqlDatabase?useSSL=true&requireSSL=true&serverTimezone=UTC" `
    AZURE_MYSQL_USERNAME="eventramysql" `
    AZURE_MYSQL_PASSWORD="YourSecurePassword123!" `
    JWT_SECRET="your-very-long-and-secure-jwt-secret-key-for-production-use-at-least-256-bits" `
    JWT_EXPIRATION="86400000" `
    CORS_ALLOWED_ORIGINS="https://your-frontend-domain.azurewebsites.net"
```

### Step 4: Deploy Application
```powershell
# Set environment variables for deployment
$env:AZURE_SUBSCRIPTION_ID = "your-subscription-id"
$env:AZURE_RESOURCE_GROUP = $resourceGroup
$env:AZURE_APP_NAME = $appName

# Run deployment script
.\deploy-azure.ps1
```

## 🔧 Manual Deployment (Alternative)

### 1. Build the application
```powershell
./mvnw clean package -Pazure -DskipTests
```

### 2. Deploy using Azure CLI
```powershell
az webapp deploy `
  --resource-group $resourceGroup `
  --name $appName `
  --src-path target/app.jar `
  --type jar
```

## 🗄️ Database Setup Options

### Option 1: Azure Database for MySQL (Flexible Server) - Recommended
- Better performance and features
- More cost-effective for production
- Better integration with Azure services

### Option 2: Azure Database for MySQL (Single Server) - Legacy
- Still supported but being deprecated
- Use only if you have specific requirements

### Sample Connection Strings:

**Flexible Server:**
```
jdbc:mysql://your-server.mysql.database.azure.com:3306/your-database?useSSL=true&requireSSL=true&serverTimezone=UTC
Username: your-username
Password: your-password
```

**Single Server:**
```
jdbc:mysql://your-server.mysql.database.azure.com:3306/your-database?useSSL=true&requireSSL=true&serverTimezone=UTC
Username: your-username@your-server
Password: your-password
```

## 🔐 Security Configuration

### 1. Configure Firewall Rules
```powershell
# Allow Azure services to access MySQL
az mysql flexible-server firewall-rule create `
  --resource-group $resourceGroup `
  --name $mysqlServer `
  --rule-name AllowAzureServices `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0

# Allow your IP (for management)
az mysql flexible-server firewall-rule create `
  --resource-group $resourceGroup `
  --name $mysqlServer `
  --rule-name AllowMyIP `
  --start-ip-address YOUR.IP.ADDRESS.HERE `
  --end-ip-address YOUR.IP.ADDRESS.HERE
```

### 2. Enable HTTPS Only
```powershell
az webapp update `
  --resource-group $resourceGroup `
  --name $appName `
  --https-only true
```

### 3. Configure Custom Domain (Optional)
```powershell
# Add custom domain
az webapp config hostname add `
  --resource-group $resourceGroup `
  --webapp-name $appName `
  --hostname your-domain.com

# Enable SSL
az webapp config ssl bind `
  --resource-group $resourceGroup `
  --name $appName `
  --certificate-thumbprint <thumbprint> `
  --ssl-type SNI
```

## 📊 Monitoring and Logging

### Enable Application Insights
```powershell
# Create Application Insights
az monitor app-insights component create `
  --app $appName `
  --location $location `
  --resource-group $resourceGroup

# Get instrumentation key
$instrumentationKey = az monitor app-insights component show `
  --app $appName `
  --resource-group $resourceGroup `
  --query instrumentationKey -o tsv

# Add to app settings
az webapp config appsettings set `
  --resource-group $resourceGroup `
  --name $appName `
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$instrumentationKey
```

### View Logs
```powershell
# Stream logs
az webapp log tail --resource-group $resourceGroup --name $appName

# Download logs
az webapp log download --resource-group $resourceGroup --name $appName
```

## 🔄 CI/CD with GitHub Actions

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 17
      uses: actions/setup-java@v2
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: ./mvnw clean package -Pazure -DskipTests
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: '${{ secrets.AZURE_APP_NAME }}'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: 'target/app.jar'
```

## 💰 Cost Optimization

### Development/Testing:
- **App Service**: B1 Basic ($13.14/month)
- **MySQL**: Burstable B1ms ($12.41/month)
- **Total**: ~$25.55/month

### Production:
- **App Service**: S1 Standard ($54.75/month)
- **MySQL**: General Purpose GP_Gen5_2 ($76.65/month)
- **Total**: ~$131.40/month

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check firewall rules
   - Verify connection string format
   - Ensure SSL is properly configured

2. **Application Won't Start**
   - Check application logs: `az webapp log tail`
   - Verify Java version is 17
   - Check memory settings

3. **Environment Variables Not Loading**
   - Verify app settings in Azure Portal
   - Check application-azure.properties file
   - Ensure SPRING_PROFILES_ACTIVE=azure

### Health Check Endpoint:
Your application will be available at:
- **Main App**: `https://your-app-name.azurewebsites.net`
- **Health Check**: `https://your-app-name.azurewebsites.net/actuator/health`
- **API Status**: `https://your-app-name.azurewebsites.net/api/status`

## 📚 Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Database for MySQL Documentation](https://docs.microsoft.com/en-us/azure/mysql/)
- [Spring Boot on Azure Guide](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)
