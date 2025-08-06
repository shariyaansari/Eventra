#!/bin/bash
# Quick Setup Script for Bump.sh with Azure + Vercel
# Run this after setting up your Bump.sh account

echo "🚀 Setting up Bump.sh for Azure + Vercel deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running in PowerShell (Windows)
if command -v pwsh &> /dev/null; then
    echo "Detected Windows PowerShell environment"
    SHELL_TYPE="pwsh"
else
    SHELL_TYPE="bash"
fi

echo -e "${YELLOW}📋 Prerequisites Check${NC}"

# Check for required tools
echo "Checking for required tools..."

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm found${NC}"

if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ curl found${NC}"

# Install bump-sh CLI
echo -e "${YELLOW}📦 Installing Bump.sh CLI...${NC}"
npm install -g bump-sh-cli

echo -e "${YELLOW}🔧 Configuration Setup${NC}"
echo "Please provide the following information from your Bump.sh account:"

read -p "Enter your Bump.sh Doc ID: " BUMP_DOC_ID
read -p "Enter your Bump.sh API Token: " BUMP_TOKEN
read -p "Enter your Azure backend URL (e.g., https://eventra-backend.azurewebsites.net): " AZURE_URL
read -p "Enter your Vercel frontend URL (e.g., https://eventra.vercel.app): " VERCEL_URL

# Update bump.yml configuration
echo -e "${YELLOW}📝 Updating bump.yml configuration...${NC}"
sed -i.bak "s/your-doc-id-from-bump-sh/${BUMP_DOC_ID}/g" backend/bump.yml
sed -i.bak "s/your-hub-name/eventra/g" backend/bump.yml

# Update OpenAPI servers
echo -e "${YELLOW}🔄 Updating OpenAPI server URLs...${NC}"

# Create a temporary Python script to update JSON
cat > update_openapi.py << EOF
import json
import sys

# Read the current openapi.json
with open('backend/openapi.json', 'r') as f:
    data = json.load(f)

# Update servers
data['servers'] = [
    {
        "url": "http://localhost:8080",
        "description": "Local Development Server"
    },
    {
        "url": "${AZURE_URL}",
        "description": "Azure Production Server"
    }
]

# Update info
data['info']['description'] = "Event Management System API - Backend on Azure, Frontend on Vercel"

# Write back
with open('backend/openapi.json', 'w') as f:
    json.dump(data, f, indent=2)

print("OpenAPI specification updated successfully!")
EOF

python3 update_openapi.py
rm update_openapi.py

echo -e "${YELLOW}🔐 GitHub Secrets Setup${NC}"
echo "Please add these secrets to your GitHub repository:"
echo "Go to: GitHub Repository → Settings → Secrets and variables → Actions"
echo ""
echo "BUMP_DOC_ID: ${BUMP_DOC_ID}"
echo "BUMP_TOKEN: ${BUMP_TOKEN}"
echo ""

echo -e "${YELLOW}🌐 Testing connectivity...${NC}"

# Test Azure backend
echo "Testing Azure backend..."
if curl -f "${AZURE_URL}/actuator/health" &> /dev/null; then
    echo -e "${GREEN}✅ Azure backend is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Azure backend not accessible (this is normal if not yet deployed)${NC}"
fi

# Test Vercel frontend
echo "Testing Vercel frontend..."
if curl -f "${VERCEL_URL}" &> /dev/null; then
    echo -e "${GREEN}✅ Vercel frontend is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Vercel frontend not accessible (this is normal if not yet deployed)${NC}"
fi

echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Add the GitHub secrets mentioned above"
echo "2. Push your changes to trigger the workflow"
echo "3. Your API documentation will be available at: https://bump.sh/eventra/doc/eventra-api"
echo ""
echo "For manual deployment, run:"
echo "bump deploy backend/openapi.json --doc ${BUMP_DOC_ID} --token ${BUMP_TOKEN}"
