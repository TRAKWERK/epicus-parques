@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     🏭 TRAKWERK PARQUES INDUSTRIALES - SCRIPT DE DEPLOY       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [1/4] ✅ Estado del proyecto
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npm run build 2>nul
if %errorlevel% equ 0 (
    echo ✓ Proyecto compilado correctamente
) else (
    echo ✗ Error en la compilación
    pause
    exit /b 1
)
echo.

echo [2/4] 📝 Instrucciones de Supabase
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 1. Ve a https://supabase.com
echo 2. Crea un proyecto llamado "trakwerk-parques"
echo 3. En Settings → API, copia:
echo    - Project URL
echo    - anon public key
echo 4. Edita .env.local con tus credenciales
echo.
pause

echo [3/4] 🐙 Subirlo a GitHub
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 1. Ve a https://github.com/new
echo 2. Crea repo: "trakwerk-parques"
echo 3. Copia el comando "git remote add origin..."
echo 4. Pega este comando:
echo.
git status
echo.
pause

echo [4/4] 🚀 Deploy en Vercel
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 1. Ve a https://vercel.com
echo 2. Conecta tu GitHub
echo 3. Importa el repositorio "trakwerk-parques"
echo 4. Añade variables de entorno:
echo    NEXT_PUBLIC_SUPABASE_URL
echo    NEXT_PUBLIC_SUPABASE_ANON_KEY
echo 5. Deploy
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║          ✨ ¡Tu aplicación estará en producción en 5 min!      ║
echo ║                                                                ║
echo ║  🔗 URL: https://parques.trakwerk.com.mx                       ║
echo ║  🔑 Login: Trakwerk72661%                                      ║
echo ║  💬 WhatsApp: +52 8184606294                                   ║
echo ║                                                                ║
echo ║  📧 Soporte: josefraige@gmail.com                              ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
pause
