#!/bin/bash

# EPICUS PARQUES INDUSTRIALES - DEPLOYMENT AUTOMÁTICO
# Este script guía el proceso de deployment en 4 pasos

echo "════════════════════════════════════════════════════════════════"
echo "  EPICUS PARQUES INDUSTRIALES - DEPLOYMENT EN VERCEL + SUPABASE"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Este script te guiará a través de 4 pasos para tener tu aplicación"
echo "EN VIVO en internet en ~15 minutos."
echo ""

# PASO 1: GitHub
echo "PASO 1: Sincronizar con GitHub"
echo "─────────────────────────────────"
read -p "¿Ya configuraste Git con tu cuenta de GitHub? (s/n): " github_ready

if [ "$github_ready" = "s" ]; then
    echo "Sincronizando con GitHub..."
    git add -A
    git commit -m "Deployment: EPICUS PARQUES INDUSTRIALES - Ready for Vercel" 2>/dev/null || echo "Sin cambios para commitar"
    git push origin main
    echo "✓ GitHub sincronizado"
else
    echo "Primero configura Git:"
    echo "  git config --global user.name 'Tu Nombre'"
    echo "  git config --global user.email 'tu@email.com'"
    echo "  git push origin main"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "PASO 2 & 3: SUPABASE + VERCEL"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Ahora necesitas hacer lo siguiente MANUALMENTE en el navegador:"
echo ""
echo "A) CREAR SUPABASE (5 minutos)"
echo "   1. Abre: https://supabase.com"
echo "   2. Haz clic: 'Sign Up' → 'Continue with GitHub'"
echo "   3. Crea proyecto 'epicus-parques'"
echo "   4. Copia estos 2 valores:"
echo "      - Project URL (ej: https://xxxxx.supabase.co)"
echo "      - Anon Public Key (Project Settings → API Keys)"
echo ""
echo "B) DESPLEGAR EN VERCEL (3 minutos)"
echo "   1. Abre: https://vercel.com"
echo "   2. Haz clic: 'Sign Up' → 'Continue with GitHub'"
echo "   3. 'New Project' → Busca 'trakwerk-parques'"
echo "   4. Environment Variables:"
echo "      - NEXT_PUBLIC_SUPABASE_URL = (el URL de Supabase)"
echo "      - NEXT_PUBLIC_SUPABASE_ANON_KEY = (la key de Supabase)"
echo "   5. Haz clic: 'Deploy'"
echo ""
echo "Espera ~2 minutos a que Vercel compile..."
echo ""

read -p "¿Ya completaste Supabase + Vercel? (s/n): " deploy_done

if [ "$deploy_done" = "s" ]; then
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo "✓ ¡DEPLOYMENT COMPLETADO!"
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "Tu aplicación está EN VIVO en:"
    echo "  https://epicus-parques.vercel.app"
    echo ""
    echo "Puedes acceder con:"
    echo "  Contraseña: Trakwerk72661%"
    echo ""
    echo "📱 Contacto WhatsApp: +52 8184606294"
    echo ""
    echo "PASO 4: (Opcional) Dominio Personalizado"
    echo "─────────────────────────────────────────"
    echo "Si quieres usar epicus.trakwerk.com.mx:"
    echo "  1. En Vercel → Project Settings → Domains"
    echo "  2. Agrega tu dominio personalizado"
    echo "  3. Sigue instrucciones de DNS"
    echo ""
else
    echo "Completa los pasos en Supabase y Vercel, luego ejecuta este script nuevamente."
fi
