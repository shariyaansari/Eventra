# Quick Setup Script for Bump.sh with Azure + Vercel (PowerShell)
# Run this after setting up your Bump.sh account

Write-Host "🚀 Setting up Bump.sh for Azure + Vercel deployment..." -ForegroundColor Green

Write-Host "📋 Prerequisites Check" -ForegroundColor Yellow

# Check for required tools
Write-Host "Checking for required tools..."

try {
    npm --version | Out-Null
    Write-Host "✅ npm found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install Node.js" -ForegroundColor Red
    exit 1
}

try {
    curl --version | Out-Null
    Write-Host "✅ curl found" -ForegroundColor Green
} catch {
    Write-Host "❌ curl is not installed" -ForegroundColor Red
    exit 1
}

# Install bump-sh CLI
Write-Host "📦 Installing Bump.sh CLI..." -ForegroundColor Yellow
npm install -g bump-sh-cli

Write-Host "🔧 Configuration Setup" -ForegroundColor Yellow
Write-Host "Please provide the following information from your Bump.sh account:"

$BUMP_DOC_ID = Read-Host "Enter your Bump.sh Doc ID"
$BUMP_TOKEN = Read-Host "Enter your Bump.sh API Token"
$AZURE_URL = Read-Host "Enter your Azure backend URL (e.g., https://eventra-backend.azurewebsites.net)"
$VERCEL_URL = Read-Host "Enter your Vercel frontend URL (e.g., https://eventra.vercel.app)"

# Update bump.yml configuration
Write-Host "📝 Updating bump.yml configuration..." -ForegroundColor Yellow
$bumpYmlPath = "backend\bump.yml"
$bumpYmlContent = Get-Content $bumpYmlPath -Raw
$bumpYmlContent = $bumpYmlContent -replace "your-doc-id-from-bump-sh", $BUMP_DOC_ID
$bumpYmlContent = $bumpYmlContent -replace "your-hub-name", "eventra"
Set-Content $bumpYmlPath $bumpYmlContent

# Update OpenAPI servers
Write-Host "🔄 Updating OpenAPI server URLs..." -ForegroundColor Yellow

$openApiPath = "backend\openapi.json"
$openApiContent = Get-Content $openApiPath | ConvertFrom-Json

# Update servers
$openApiContent.servers = @(
    @{
        url = "http://localhost:8080"
        description = "Local Development Server"
    },
    @{
        url = $AZURE_URL
        description = "Azure Production Server"
    }
)

# Update info
$openApiContent.info.description = "Event Management System API - Backend on Azure, Frontend on Vercel"

# Write back
$openApiContent | ConvertTo-Json -Depth 100 | Set-Content $openApiPath

Write-Host "🔐 GitHub Secrets Setup" -ForegroundColor Yellow
Write-Host "Please add these secrets to your GitHub repository:"
Write-Host "Go to: GitHub Repository → Settings → Secrets and variables → Actions"
Write-Host ""
Write-Host "BUMP_DOC_ID: $BUMP_DOC_ID" -ForegroundColor Cyan
Write-Host "BUMP_TOKEN: $BUMP_TOKEN" -ForegroundColor Cyan
Write-Host ""

Write-Host "🌐 Testing connectivity..." -ForegroundColor Yellow

# Test Azure backend
Write-Host "Testing Azure backend..."
try {
    $response = Invoke-WebRequest -Uri "$AZURE_URL/actuator/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Azure backend is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Azure backend not accessible (this is normal if not yet deployed)" -ForegroundColor Yellow
}

# Test Vercel frontend
Write-Host "Testing Vercel frontend..."
try {
    $response = Invoke-WebRequest -Uri $VERCEL_URL -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Vercel frontend is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Vercel frontend not accessible (this is normal if not yet deployed)" -ForegroundColor Yellow
}

Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Add the GitHub secrets mentioned above"
Write-Host "2. Push your changes to trigger the workflow"
Write-Host "3. Your API documentation will be available at: https://bump.sh/eventra/doc/eventra-api"
Write-Host ""
Write-Host "For manual deployment, run:"
Write-Host "bump deploy backend\openapi.json --doc $BUMP_DOC_ID --token $BUMP_TOKEN" -ForegroundColor Cyan
