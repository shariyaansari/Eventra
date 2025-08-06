# Bump.sh Setup Script for PowerShell
# This script helps you set up Bump.sh for your API documentation

Write-Host "🚀 Setting up Bump.sh for Eventra API..." -ForegroundColor Green

# Check if npm is installed (needed for Bump.sh CLI)
try {
    npm --version | Out-Null
    Write-Host "✅ npm is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install Bump.sh CLI
Write-Host "📦 Installing Bump.sh CLI..." -ForegroundColor Yellow
npm install -g bump-sh-cli

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Bump.sh CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install Bump.sh CLI" -ForegroundColor Red
    exit 1
}

# Check if application is running
Write-Host "🔍 Checking if application is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Application is running" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Application is not running. Please start it first:" -ForegroundColor Yellow
    Write-Host "   .\load-env.ps1" -ForegroundColor Cyan
    Write-Host "   .\mvnw spring-boot:run" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

# Generate OpenAPI specification
Write-Host "📄 Generating OpenAPI specification..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri "http://localhost:8080/api-docs" -OutFile "openapi.json"
    Write-Host "✅ OpenAPI specification generated: openapi.json" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to generate OpenAPI specification" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Sign up at https://bump.sh/" -ForegroundColor White
Write-Host "2. Create a new documentation project" -ForegroundColor White
Write-Host "3. Get your API token from the dashboard" -ForegroundColor White
Write-Host "4. Deploy your documentation:" -ForegroundColor White
Write-Host "   bump deploy openapi.json --doc <your-doc-id> --token <your-token>" -ForegroundColor Gray
Write-Host ""
Write-Host "For CI/CD, add these secrets to your GitHub repository:" -ForegroundColor Cyan
Write-Host "- BUMP_DOC_ID: Your documentation ID" -ForegroundColor White
Write-Host "- BUMP_TOKEN: Your API token" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation will be available at:" -ForegroundColor Cyan
Write-Host "- Local Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor White
Write-Host "- Local OpenAPI JSON: http://localhost:8080/api-docs" -ForegroundColor White
Write-Host "- Bump.sh: https://bump.sh/your-hub-name/doc/your-doc-name" -ForegroundColor White
