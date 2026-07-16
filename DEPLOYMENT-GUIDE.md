# EPICUS PARQUES - Guía de Deployment 🚀

**Estado:** ✅ Código en GitHub y Vercel (auto-deploy configurado)  
**Stack:** Next.js 16 + Supabase + TypeScript + Tailwind  
**URL Vercel:** https://epicus-parques.vercel.app

---

## PASO 1️⃣ - Crear Proyecto en Supabase

1. Ve a **https://supabase.com**
2. Crea cuenta (si no tienes)
3. Clic en **"New project"**
4. **Parámetros:**
   - Project Name: `epicus-parques` (o tu preferencia)
   - Database Password: (generada automáticamente - guarda en lugar seguro)
   - Region: `us-east-1` (o la más cercana a ti)
5. Espera ~2 min a que se cree la BD

---

## PASO 2️⃣ - Copiar Credenciales de Supabase

En el dashboard de Supabase:

1. Ve a **Settings > API** (en sidebar izquierdo)
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service role secret** (si existe) → `SUPABASE_SERVICE_ROLE_KEY`

**Ejemplo:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
```

---

## PASO 3️⃣ - Crear Tablas en Supabase (CRÍTICO)

### Opción A: SQL Editor en Supabase (Recomendado)

1. En Supabase Dashboard: **SQL Editor** (sidebar izquierdo)
2. Clic en **"New query"**
3. **Copia TODO el contenido de `supabase-setup.sql`** de tu proyecto
4. Pégalo en el editor
5. Clic en **"Run"**
6. Verifica en **Tables** que las 7 tablas se crearon:
   - ✅ usuarios
   - ✅ parques
   - ✅ lotes
   - ✅ consultas
   - ✅ historial_cambios
   - ✅ reservas
   - ✅ configuracion

### Opción B: Por línea de comandos
```bash
# Si tienes Supabase CLI instalado
supabase db push

# O usando psql (si tienes PostgreSQL tools)
psql -U postgres -h [tu-proyecto].supabase.co -f supabase-setup.sql
```

---

## PASO 4️⃣ - Configurar Variables en Vercel

1. Ve a **https://vercel.com/dashboard**
2. Selecciona proyecto **epicus-parques**
3. Vé a **Settings > Environment Variables**
4. Agrega 3 variables:

| Variable | Valor | Tipo |
|----------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Anon Key | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Tu Service Role (opcional) | Secret |

5. Clic en **"Save"**
6. Vercel redeployará automáticamente (~30-60 seg)

---

## PASO 5️⃣ - Verificar Deployment

### Verificar en Local (si quieres probar primero)
```bash
cd C:\Users\Usuario\trakwerk-parques

# Agregar variables locales a .env.local
echo NEXT_PUBLIC_SUPABASE_URL=https://... >> .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... >> .env.local

# Ejecutar app local
npm run dev
# Abre http://localhost:3000
```

### Verificar en Vercel
1. Abre **https://epicus-parques.vercel.app**
2. Deberías ver:
   - ✅ Hero banner con "EPICUS PARQUES INDUSTRIALES"
   - ✅ 3 tarjetas de parques (EPICUS, TERRA REGIA, PALMAR II)
   - ✅ Estadísticas: 137 lotes, 55 disponibles
   - ✅ Botones funcionales en navbar

---

## PASO 6️⃣ - Probar APIs

Las APIs ya están funcionales:

### GET - Ver todos los parques
```bash
curl "https://epicus-parques.vercel.app/api/parques" \
  -H "Accept: application/json"

# Respuesta esperada:
# {"success": true, "data": [...], "count": 3}
```

### GET - Ver lotes de un parque
```bash
# Primero obtén el parque_id de la respuesta anterior
curl "https://epicus-parques.vercel.app/api/lotes?parque_id=<uuid>&limit=50"
```

---

## 📋 CHECKLIST FINAL

- [ ] Proyecto creado en Supabase
- [ ] Credenciales copiadas
- [ ] SQL script ejecutado en Supabase (7 tablas creadas)
- [ ] Variables agregadas en Vercel
- [ ] Vercel redeployó (status verde)
- [ ] Página principal carga correctamente
- [ ] APIs responden con datos

---

## 🔗 URLs Importantes

| Recurso | URL |
|---------|-----|
| App Live | https://epicus-parques.vercel.app |
| GitHub Repo | https://github.com/TRAKWERK/epicus-parques |
| Vercel Dashboard | https://vercel.com/dashboard |
| Supabase Dashboard | https://supabase.com/dashboard |

---

## 🆘 Si algo no funciona

**Error: "Cannot find Supabase environment variables"**
→ Verifica que NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY están en Vercel

**Error: "Table 'parques' not found"**
→ El SQL script no se ejecutó. Vuelve a PASO 3

**Error: "CORS policy blocked request"**
→ Verifica que las tablas tienen RLS policies permitiendo lectura pública

**APIs devuelven 500**
→ Verifica en Vercel > Deployments > Logs las líneas de error exactas

---

## 📚 Próximos Pasos (Fase 2)

Cuando todo esté funcionando:

1. **Agregar autenticación JWT profesional**
2. **Crear detailed page para cada lote**
3. **Integrar Google Maps con locations**
4. **Sistema de reportes en admin panel**
5. **Export a CSV/PDF desde reportes**

---

**Última actualización:** 2026-07-15  
**Versión App:** 1.0.0  
**Status:** ✅ LISTO PARA PRODUCCIÓN
