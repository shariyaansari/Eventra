# Load Azure environment variables from .env.azure file
# Usage: .\load-env-azure.ps1

$envFile = ".env.azure"

if (Test-Path $envFile) {
    Write-Host "Loading Azure environment variables from $envFile..." -ForegroundColor Green
    
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$' -and !$_.StartsWith('#')) {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove surrounding quotes if present
            if (($value.StartsWith('"') -and $value.EndsWith('"')) -or 
                ($value.StartsWith("'") -and $value.EndsWith("'"))) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            Write-Host "Set $name" -ForegroundColor Yellow
        }
    }
    
    Write-Host "Azure environment variables loaded successfully!" -ForegroundColor Green
    Write-Host "You can now run: .\mvnw spring-boot:run -Dspring.profiles.active=azure" -ForegroundColor Cyan
} else {
    Write-Host "Error: .env.azure file not found!" -ForegroundColor Red
    Write-Host "Please copy .env.azure.example to .env.azure and fill in your Azure values." -ForegroundColor Yellow
    Write-Host "Example: cp .env.azure.example .env.azure" -ForegroundColor Cyan
}
