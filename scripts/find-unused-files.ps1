# Script to find potentially unused files in the project

$projectRoot = "c:\Users\Dell\standalone-taskmanager"
$excludeDirs = @('node_modules', '.git', '.expo', 'dist', 'build')

# Get all TypeScript/JavaScript files
$allFiles = Get-ChildItem -Path $projectRoot -Recurse -Include *.ts,*.tsx,*.js,*.jsx -File | 
    Where-Object { 
        $path = $_.FullName
        -not ($excludeDirs | Where-Object { $path -match [regex]::Escape($_) })
    }

# Files that are typically entry points or configuration
$entryPoints = @(
    '_layout.tsx',
    'index.tsx',
    'app.json',
    'package.json',
    'tsconfig.json',
    'eas.json',
    'eslint.config.js',
    'i18n.ts',
    'expo-env.d.ts'
)

$unusedFiles = @()

foreach ($file in $allFiles) {
    $fileName = $file.Name
    $relativePath = $file.FullName.Replace($projectRoot, '').TrimStart('\')
    
    # Skip entry points
    if ($entryPoints -contains $fileName) {
        continue
    }
    
    # Get file name without extension for searching
    $fileNameNoExt = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    
    # Search for imports of this file
    $searchPatterns = @(
        $fileNameNoExt,
        $fileName,
        ($relativePath -replace '\\', '/')
    )
    
    $found = $false
    
    foreach ($pattern in $searchPatterns) {
        # Search in all files for import statements
        $matches = Select-String -Path ($allFiles | Select-Object -ExpandProperty FullName) `
            -Pattern "import.*['\`"].*$([regex]::Escape($pattern))" `
            -ErrorAction SilentlyContinue
        
        if ($matches) {
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        $unusedFiles += [PSCustomObject]@{
            File = $relativePath
            Size = $file.Length
        }
    }
}

# Output results
Write-Host "`n=== POTENTIALLY UNUSED FILES ===" -ForegroundColor Yellow
Write-Host "Total files analyzed: $($allFiles.Count)" -ForegroundColor Cyan
Write-Host "Potentially unused: $($unusedFiles.Count)`n" -ForegroundColor Cyan

$unusedFiles | Sort-Object File | Format-Table -AutoSize

# Group by directory
Write-Host "`n=== BY DIRECTORY ===" -ForegroundColor Yellow
$unusedFiles | Group-Object { Split-Path $_.File -Parent } | 
    Sort-Object Name | 
    ForEach-Object {
        Write-Host "`n$($_.Name):" -ForegroundColor Green
        $_.Group | ForEach-Object { Write-Host "  - $($_.File)" }
    }
