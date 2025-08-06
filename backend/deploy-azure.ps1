# Azure Deployment Script for PowerShell
# This script builds and deploys your Spring Boot application to Azure App Service

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = $env:AZURE_RESOURCE_GROUP,
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = $env:AZURE_APP_NAME,
    
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = $env:AZURE_SUBSCRIPTION_ID
)

Write-Host "🚀 Starting Azure deployment process..." -ForegroundColor Green

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-Host "✅ Azure CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI is not installed. Please install it first." -ForegroundColor Red
    Write-Host "Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Login to Azure (if not already logged in)
Write-Host "🔐 Checking Azure login status..." -ForegroundColor Yellow
$loginStatus = az account show 2>$null
if (-not $loginStatus) {
    Write-Host "Please login to Azure..." -ForegroundColor Yellow
    az login
}

# Set subscription if provided
if ($SubscriptionId) {
    Write-Host "🎯 Setting Azure subscription to: $SubscriptionId" -ForegroundColor Yellow
    az account set --subscription $SubscriptionId
}

# Build the application
Write-Host "🔨 Building the application with Azure profile..." -ForegroundColor Yellow
./mvnw clean package -Pazure -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Deploy to Azure App Service
if ($ResourceGroup -and $AppName) {
    Write-Host "🚀 Deploying to Azure App Service..." -ForegroundColor Yellow
    Write-Host "   Resource Group: $ResourceGroup" -ForegroundColor Cyan
    Write-Host "   App Name: $AppName" -ForegroundColor Cyan
    
    ./mvnw azure-webapp:deploy -Pazure
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
        Write-Host "🌐 Your application should be available at: https://$AppName.azurewebsites.net" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  Resource Group and App Name are required for deployment." -ForegroundColor Yellow
    Write-Host "Please set AZURE_RESOURCE_GROUP and AZURE_APP_NAME environment variables or pass them as parameters." -ForegroundColor Yellow
    Write-Host "Example: .\deploy-azure.ps1 -ResourceGroup 'my-rg' -AppName 'my-app'" -ForegroundColor Cyan
}

Write-Host "🎉 Azure deployment process completed!" -ForegroundColor Green
