# ╔════════════════════════════════════════════════════════════════╗
# ║  TRAKWERK PARQUES - SETUP AUTOMÁTICO INTERACTIVO                ║
# ║  Este script prepara TODO para Supabase, GitHub y Vercel         ║
# ╚════════════════════════════════════════════════════════════════╝

$ErrorActionPreference = "Stop"

function Show-Header {
    Clear-Host
    Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║   🏭 TRAKWERK PARQUES - SETUP AUTOMÁTICO INTERACTIVO          ║" -ForegroundColor Cyan
    Write-Host "║   Next.js + Supabase + GitHub + Vercel                        ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Pause-Script {
    Write-Host ""
    Read-Host "Presiona ENTER para continuar"
    Write-Host ""
}

function Test-Environment {
    Write-Host "🔍 Verificando entorno..." -ForegroundColor Yellow

    $checks = @(
        @{Name="Node.js"; Command="node --version"},
        @{Name="npm"; Command="npm --version"},
        @{Name="Git"; Command="git --version"}
    )

    foreach ($check in $checks) {
        try {
            $version = & $check.Command 2>$null
            Write-Host "  ✓ $($check.Name): $version" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ $($check.Name): NO INSTALADO" -ForegroundColor Red
            return $false
        }
    }
    return $true
}

function Show-Step1-Supabase {
    Show-Header
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "PASO 1/4: CREAR SUPABASE" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "1️⃣  Ve a: " -NoNewline
    Write-Host "https://supabase.com/dashboard" -ForegroundColor Blue
    Write-Host ""

    Write-Host "2️⃣  Haz click en:" -ForegroundColor Yellow
    Write-Host "   → 'New Project'" -ForegroundColor White
    Write-Host ""

    Write-Host "3️⃣  Rellena el formulario:" -ForegroundColor Yellow
    Write-Host "   → Nombre: " -NoNewline -ForegroundColor White
    Write-Host "trakwerk-parques" -ForegroundColor Green
    Write-Host "   → Región: " -NoNewline -ForegroundColor White
    Write-Host "us-east-1 (North America)" -ForegroundColor Green
    Write-Host "   → Password: " -NoNewline -ForegroundColor White
    Write-Host "TuContraseña123Fuerte!" -ForegroundColor Green
    Write-Host ""

    Write-Host "4️⃣  Click 'Create new project'" -ForegroundColor Yellow
    Write-Host "   ⏳ Espera 2-3 minutos" -ForegroundColor Gray
    Write-Host ""

    Write-Host "5️⃣  Una vez creado, ve a:" -ForegroundColor Yellow
    Write-Host "   → Settings → API" -ForegroundColor White
    Write-Host ""

    Write-Host "6️⃣  COPIA estas dos credenciales:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   A) Project URL:" -ForegroundColor Cyan
    Write-Host "      https://xxxxxxxxxxxx.supabase.co" -ForegroundColor White
    Write-Host ""
    Write-Host "   B) anon public:" -ForegroundColor Cyan
    Write-Host "      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -ForegroundColor White
    Write-Host ""
    Write-Host "7️⃣  PEGAlas en el paso siguiente cuando se pida" -ForegroundColor Yellow
    Write-Host ""

    Pause-Script

    $supabaseUrl = Read-Host "Pega aquí tu SUPABASE URL"
    $supabaseKey = Read-Host "Pega aquí tu ANON KEY"

    if ([string]::IsNullOrWhiteSpace($supabaseUrl) -or [string]::IsNullOrWhiteSpace($supabaseKey)) {
        Write-Host "❌ Error: Las credenciales no pueden estar vacías" -ForegroundColor Red
        return $null
    }

    # Guardar credenciales en .env.local
    $envFile = "$PSScriptRoot\.env.local"
    $envContent = @"
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey
"@

    Set-Content -Path $envFile -Value $envContent
    Write-Host "✅ Credenciales guardadas en .env.local" -ForegroundColor Green
    Write-Host ""

    return @{URL=$supabaseUrl; Key=$supabaseKey}
}

function Show-Step2-GitHub {
    Show-Header
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "PASO 2/4: CREAR REPOSITORIO EN GITHUB" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "1️⃣  Ve a: " -NoNewline
    Write-Host "https://github.com/new" -ForegroundColor Blue
    Write-Host ""

    Write-Host "2️⃣  Rellena:" -ForegroundColor Yellow
    Write-Host "   → Repository name: " -NoNewline -ForegroundColor White
    Write-Host "trakwerk-parques" -ForegroundColor Green
    Write-Host "   → Description: " -NoNewline -ForegroundColor White
    Write-Host "Aplicación de venta de lotes industriales" -ForegroundColor Green
    Write-Host ""

    Write-Host "3️⃣  Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""

    Write-Host "4️⃣  En la siguiente pantalla, busca:" -ForegroundColor Yellow
    Write-Host "   'push an existing repository from the command line'" -ForegroundColor White
    Write-Host ""

    Write-Host "5️⃣  COPIA tu usuario de GitHub:" -ForegroundColor Yellow
    $githubUser = Read-Host "¿Cuál es tu usuario de GitHub?"

    if ([string]::IsNullOrWhiteSpace($githubUser)) {
        Write-Host "❌ Error: Usuario de GitHub requerido" -ForegroundColor Red
        return $null
    }

    Write-Host ""
    Write-Host "Ejecutando comandos de Git..." -ForegroundColor Green

    # Ejecutar comandos de git
    $commands = @(
        "git remote add origin https://github.com/$githubUser/trakwerk-parques.git",
        "git branch -M main",
        "git push -u origin main"
    )

    foreach ($cmd in $commands) {
        Write-Host "  $ $cmd" -ForegroundColor Gray
        try {
            Invoke-Expression $cmd
            Write-Host "  ✓" -ForegroundColor Green
        }
        catch {
            Write-Host "  ⚠️ Posible error: $_" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "✅ Repositorio push a GitHub" -ForegroundColor Green
    Write-Host ""

    Pause-Script

    return $githubUser
}

function Show-Step3-Vercel {
    Show-Header
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "PASO 3/4: DESPLEGAR EN VERCEL" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "1️⃣  Ve a: " -NoNewline
    Write-Host "https://vercel.com/new" -ForegroundColor Blue
    Write-Host ""

    Write-Host "2️⃣  Conecta con GitHub:" -ForegroundColor Yellow
    Write-Host "   → Click 'Continue with GitHub'" -ForegroundColor White
    Write-Host "   → Autoriza a Vercel" -ForegroundColor White
    Write-Host ""

    Write-Host "3️⃣  Importa el proyecto:" -ForegroundColor Yellow
    Write-Host "   → Busca 'trakwerk-parques'" -ForegroundColor White
    Write-Host "   → Click 'Import'" -ForegroundColor White
    Write-Host ""

    Write-Host "4️⃣  IMPORTANTE - Agrega variables de entorno:" -ForegroundColor Yellow
    Write-Host "   → Ve a 'Environment Variables'" -ForegroundColor White
    Write-Host "   → Agrega 2 variables:" -ForegroundColor White
    Write-Host ""
    Write-Host "      Nombre: " -NoNewline -ForegroundColor Cyan
    Write-Host "NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor White
    Write-Host "      Valor:  " -NoNewline -ForegroundColor Cyan
    Write-Host "[La URL que copiaste de Supabase]" -ForegroundColor Green
    Write-Host ""
    Write-Host "      Nombre: " -NoNewline -ForegroundColor Cyan
    Write-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor White
    Write-Host "      Valor:  " -NoNewline -ForegroundColor Cyan
    Write-Host "[La KEY que copiaste de Supabase]" -ForegroundColor Green
    Write-Host ""

    Write-Host "5️⃣  Click 'Deploy'" -ForegroundColor Yellow
    Write-Host "   ⏳ Espera 2-3 minutos" -ForegroundColor Gray
    Write-Host ""

    Write-Host "6️⃣  Una vez deployado:" -ForegroundColor Yellow
    Write-Host "   Tu app estará en:" -ForegroundColor White
    Write-Host "   https://trakwerk-parques.vercel.app" -ForegroundColor Green
    Write-Host ""

    Pause-Script
}

function Show-Step4-Domain {
    Show-Header
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "PASO 4/4: CONECTAR DOMINIO" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "1️⃣  En tu proyecto Vercel:" -ForegroundColor Yellow
    Write-Host "   → Settings → Domains" -ForegroundColor White
    Write-Host "   → Click 'Add Custom Domain'" -ForegroundColor White
    Write-Host ""

    Write-Host "2️⃣  Agrega el dominio:" -ForegroundColor Yellow
    Write-Host "   Dominio: " -NoNewline -ForegroundColor Cyan
    Write-Host "parques.trakwerk.com.mx" -ForegroundColor Green
    Write-Host ""

    Write-Host "3️⃣  Vercel te dará un CNAME value" -ForegroundColor Yellow
    Write-Host "   Cópialo" -ForegroundColor White
    Write-Host ""

    Write-Host "4️⃣  Ve a tu proveedor DNS:" -ForegroundColor Yellow
    Write-Host "   (GoDaddy, Namecheap, tu registrador, etc)" -ForegroundColor White
    Write-Host ""

    Write-Host "5️⃣  Crea un registro CNAME:" -ForegroundColor Yellow
    Write-Host "   Host:   " -NoNewline -ForegroundColor Cyan
    Write-Host "parques" -ForegroundColor Green
    Write-Host "   Type:   " -NoNewline -ForegroundColor Cyan
    Write-Host "CNAME" -ForegroundColor Green
    Write-Host "   Value:  " -NoNewline -ForegroundColor Cyan
    Write-Host "cname.vercel-dns.com" -ForegroundColor Green
    Write-Host "   TTL:    " -NoNewline -ForegroundColor Cyan
    Write-Host "3600" -ForegroundColor Green
    Write-Host ""

    Write-Host "6️⃣  Guarda los cambios" -ForegroundColor Yellow
    Write-Host "   ⏳ Espera 15-30 minutos" -ForegroundColor Gray
    Write-Host ""

    Write-Host "7️⃣  Tu app estará en:" -ForegroundColor Yellow
    Write-Host "   " -NoNewline
    Write-Host "https://parques.trakwerk.com.mx" -ForegroundColor Green
    Write-Host ""

    Pause-Script
}

function Show-Final {
    Show-Header
    Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                                                                ║" -ForegroundColor Green
    Write-Host "║                  ✅ ¡SETUP COMPLETADO!                        ║" -ForegroundColor Green
    Write-Host "║                                                                ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""

    Write-Host "🎯 TU APLICACIÓN ESTÁ EN LÍNEA" -ForegroundColor Green
    Write-Host ""

    Write-Host "📍 URLS:" -ForegroundColor Cyan
    Write-Host "   Local:       " -NoNewline
    Write-Host "http://localhost:3000" -ForegroundColor White
    Write-Host "   Vercel:      " -NoNewline
    Write-Host "https://trakwerk-parques.vercel.app" -ForegroundColor White
    Write-Host "   Producción:  " -NoNewline
    Write-Host "https://parques.trakwerk.com.mx" -ForegroundColor Green
    Write-Host ""

    Write-Host "🔐 CREDENCIALES:" -ForegroundColor Cyan
    Write-Host "   Login:       " -NoNewline
    Write-Host "Trakwerk72661%" -ForegroundColor White
    Write-Host "   WhatsApp:    " -NoNewline
    Write-Host "+52 8184606294" -ForegroundColor White
    Write-Host "   Email:       " -NoNewline
    Write-Host "josefraige@gmail.com" -ForegroundColor White
    Write-Host ""

    Write-Host "📊 DATOS INCLUIDOS:" -ForegroundColor Cyan
    Write-Host "   • 5 parques industriales" -ForegroundColor White
    Write-Host "   • 21 lotes disponibles" -ForegroundColor White
    Write-Host "   • Catálogo con filtros" -ForegroundColor White
    Write-Host "   • Cotizador vía WhatsApp" -ForegroundColor White
    Write-Host "   • Dashboard con estadísticas" -ForegroundColor White
    Write-Host ""

    Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
    Write-Host "   1. Agregaer más datos a Supabase" -ForegroundColor White
    Write-Host "   2. Subir fotos de los lotes" -ForegroundColor White
    Write-Host "   3. Integrar pagos (Stripe/PayPal)" -ForegroundColor White
    Write-Host "   4. Crear panel de administración" -ForegroundColor White
    Write-Host ""

    Write-Host "💡 NOTA: Después de hacer cambios, solo haz:" -ForegroundColor Yellow
    Write-Host "   git add ." -ForegroundColor White
    Write-Host "   git commit -m 'Mensaje del cambio'" -ForegroundColor White
    Write-Host "   git push" -ForegroundColor White
    Write-Host "   → El deploy en Vercel es automático ✨" -ForegroundColor Green
    Write-Host ""

    Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                 ¡A VENDER LOTES INDUSTRIALES!                 ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
}

# MAIN FLOW
Show-Header

if (-not (Test-Environment)) {
    Write-Host "❌ Por favor instala las dependencias faltantes" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Entorno verificado" -ForegroundColor Green
Write-Host ""
Pause-Script

$supabase = Show-Step1-Supabase
if (-not $supabase) { exit 1 }

$github = Show-Step2-GitHub
if (-not $github) { exit 1 }

Show-Step3-Vercel

Show-Step4-Domain

Show-Final

Write-Host "Presiona ENTER para cerrar..." -NoNewline
Read-Host
