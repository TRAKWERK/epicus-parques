# EPICUS PARQUES INDUSTRIALES - DEPLOYMENT AUTOMÁTICO EN LA NUBE
# Este script hace TODO automáticamente

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║     EPICUS PARQUES INDUSTRIALES - DEPLOYMENT EN LA NUBE       ║" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# PASO 1: Solicitar GitHub
Write-Host "PASO 1: Configurar GitHub" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""
Write-Host "¿Cuál es tu usuario de GitHub?" -ForegroundColor White
$github_user = Read-Host "Usuario"

Write-Host ""
Write-Host "¿Cuál es tu token de acceso personal? (crear en: github.com/settings/tokens)" -ForegroundColor White
Write-Host "(Necesita permisos: repo, workflow)" -ForegroundColor Gray
$github_token = Read-Host "Token" -AsSecureString
$github_token_plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($github_token))

Write-Host ""
Write-Host "¿Nombre del repositorio? (default: epicus-parques)" -ForegroundColor White
$repo_name = Read-Host "Nombre (Enter para default)"
if ([string]::IsNullOrEmpty($repo_name)) { $repo_name = "epicus-parques" }

# PASO 2: Crear repositorio en GitHub
Write-Host ""
Write-Host "PASO 2: Crear repositorio en GitHub..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

$headers = @{
    "Authorization" = "token $github_token_plain"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    "name" = $repo_name
    "description" = "EPICUS PARQUES INDUSTRIALES - Plataforma de venta de lotes"
    "private" = $false
    "auto_init" = $false
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://api.github.com/user/repos" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -ContentType "application/json"

    $repo_data = $response.Content | ConvertFrom-Json
    $repo_url = $repo_data.clone_url

    Write-Host "✓ Repositorio creado: $repo_url" -ForegroundColor Green
} catch {
    if ($_.Exception.Message -like "*422*") {
        Write-Host "⚠ El repositorio ya existe, continuando..." -ForegroundColor Yellow
        $repo_url = "https://github.com/$github_user/$repo_name.git"
    } else {
        Write-Host "✗ Error: $_" -ForegroundColor Red
        exit 1
    }
}

# PASO 3: Configurar Git y pushear
Write-Host ""
Write-Host "PASO 3: Subir código a GitHub..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

cd "C:\Users\Usuario\trakwerk-parques"

# Configurar git
git config user.name "EPICUS Deployment" 2>$null
git config user.email "deploy@epicus-parques.mx" 2>$null

# Remover origin anterior si existe
git remote remove origin 2>$null

# Agregar nuevo origin
git remote add origin $repo_url

# Hacer push
Write-Host "Sincronizando con GitHub..."
git add -A
git commit -m "EPICUS PARQUES INDUSTRIALES - Deployment automático en Vercel" 2>$null || Write-Host "Sin cambios nuevos"
git push -u origin master -f

Write-Host "✓ Código subido a GitHub" -ForegroundColor Green

# PASO 4: Abrir Vercel
Write-Host ""
Write-Host "PASO 5: Abriendo Vercel..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""
Write-Host "El navegador abrirá Vercel en 3 segundos..." -ForegroundColor White
Write-Host ""
Write-Host "PASOS EN VERCEL:" -ForegroundColor Cyan
Write-Host "1. Haz clic en 'Add New...' → 'Project'" -ForegroundColor White
Write-Host "2. Busca e importa: $repo_name" -ForegroundColor White
Write-Host "3. Click 'Import'" -ForegroundColor White
Write-Host "4. Environment Variables:" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL = (dejaremos en blanco por ahora)" -ForegroundColor Gray
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY = (dejaremos en blanco por ahora)" -ForegroundColor Gray
Write-Host "5. Click 'Deploy'" -ForegroundColor White
Write-Host "6. Espera 2-3 minutos a que termine" -ForegroundColor White
Write-Host ""

Start-Sleep -Seconds 3

# Abrir Vercel
Start-Process "https://vercel.com/new"

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✓ TU REPOSITORIO ESTÁ EN LA NUBE:" -ForegroundColor Green
Write-Host "  $repo_url" -ForegroundColor Green
Write-Host ""
Write-Host "AHORA:" -ForegroundColor Yellow
Write-Host "1. En Vercel, importa el proyecto desde GitHub" -ForegroundColor White
Write-Host "2. Espera a que termine el deployment (~3 minutos)" -ForegroundColor White
Write-Host "3. ¡Tu app estará EN VIVO en internet!" -ForegroundColor Green
Write-Host ""
Write-Host "Tu URL será algo como: https://epicus-parques.vercel.app" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host ""
Write-Host "¿Ya terminó el deployment en Vercel? (s/n)" -ForegroundColor White
$vercel_done = Read-Host ""

if ($vercel_done -eq "s") {
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "🎉 ¡DEPLOYMENT COMPLETADO!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu aplicación está EN VIVO en internet." -ForegroundColor Green
    Write-Host ""
    Write-Host "Acceso:" -ForegroundColor White
    Write-Host "  Contraseña: Trakwerk72661%" -ForegroundColor Cyan
    Write-Host "  WhatsApp: +52 8184606294" -ForegroundColor Cyan
    Write-Host "  Email: josefraige@gmail.com" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "PRÓXIMAS MEJORAS (Opcional):" -ForegroundColor Yellow
    Write-Host "  • Conectar Supabase para persistencia de datos" -ForegroundColor Gray
    Write-Host "  • Conectar dominio personalizado" -ForegroundColor Gray
    Write-Host "  • Agregar variables de entorno de Supabase" -ForegroundColor Gray
}
