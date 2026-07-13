# TRAKWERK PARQUES INDUSTRIALES - Next.js + Supabase

Aplicación moderna de venta de lotes industriales con Next.js, Tailwind CSS y Supabase.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia tu **URL** y **ANON KEY** de la sección API (Settings > API)
4. Reemplaza los valores en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Contraseña de Login:** `Trakwerk72661%`

## 📋 Funcionalidades

- ✅ Login con contraseña
- ✅ Catálogo de lotes con filtros
- ✅ Vista de parques disponibles
- ✅ Formulario de cotización vía WhatsApp
- ✅ Estadísticas en tiempo real
- ✅ Interfaz responsiva

## 📁 Estructura

```
app/
├── page.tsx (Login)
└── dashboard/
    ├── page.tsx (Home)
    ├── catalogo/page.tsx
    ├── parques/page.tsx
    └── cotizador/page.tsx
```

## 🔐 Credenciales

- **Contraseña:** `Trakwerk72661%`
- **WhatsApp:** +52 8184606294
