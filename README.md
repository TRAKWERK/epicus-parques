# 🏭 EPICUS PARQUES INDUSTRIALES

Plataforma web moderna para venta de lotes industriales en Nuevo León, México.

**Estado**: ✅ **LISTO PARA DEPLOYMENT**

## 🚀 Quick Start

### Opción 1: Ejecutar Localmente
```bash
cd C:\Users\Usuario\trakwerk-parques
npm install
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000)

**Contraseña de acceso**: `Trakwerk72661%`

### Opción 2: Desplegar en Vercel (RECOMENDADO)
Sigue la guía en `DEPLOY-PASO-A-PASO.sh` o `DEPLOY-AUTOMATICO.md`

## 📋 Características

### Para Clientes
- 🗺️ **Mapa Interactivo** - Google Maps con ubicaciones de parques
- 📊 **Comparador de Parques** - Compara características lado a lado
- 📱 **Contacto WhatsApp** - Envía consultas directo por WhatsApp
- 📄 **Fichas Detalladas** - Información completa de cada parque
- 💰 **Precios Transparentes** - Rango de precios y opciones de financiamiento

### Para Administración
- 📋 **Gestionar Lotes** - CRUD completo
- 📱 **Consultas de Clientes** - Ver y responder
- 📊 **Reportes** - Estadísticas de ventas y consultas
- 🖼️ **Galería** - Upload de planos y documentos
- ⚙️ **Configuración** - Ajustes del sitio

## 📊 Datos Actuales

| Parque | Lotes | Disponibles | Rango Precios |
|--------|-------|-------------|----------------|
| EPICUS | 45 | 12 | $1.8M - $8.5M |
| TERRA REGIA | 58 | 28 | $2.2M - $12M |
| PALMAR II | 34 | 15 | $2M - $10.5M |
| **TOTAL** | **137** | **55** | **163.9M pesos** |

## 🏗️ Stack Tecnológico

- **Frontend**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v3
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Auth**: JWT (SessionStorage)
- **Maps**: Google Maps Embed

## 📁 Estructura de Carpetas

```
epicus-parques/
├── app/
│   ├── page.tsx                 # Login
│   ├── layout.tsx               # Layout global
│   ├── dashboard/
│   │   ├── layout.tsx           # Navegación
│   │   ├── page.tsx             # Dashboard home
│   │   ├── parques/             # Listado y fichas
│   │   ├── mapa/                # Google Maps
│   │   ├── comparador/          # Comparador
│   │   ├── contacto/            # Formulario WhatsApp
│   │   └── admin/               # Panel administrativo
│   │       ├── lotes/
│   │       ├── consultas/
│   │       ├── reportes/
│   │       ├── galeria/
│   │       └── configuracion/
│   └── middleware.ts            # Route protection
├── lib/
│   └── types.ts                 # TypeScript interfaces
├── public/
│   └── favicon.ico
├── DEPLOY-PASO-A-PASO.sh        # Script de deployment
├── DEPLOY-AUTOMATICO.md         # Guía detallada
└── .env.example                 # Variables de entorno
```

## 🔑 Variables de Entorno

Copia `.env.example` a `.env.local` y completa:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Acceso Admin

**URL**: `/dashboard/admin`

**Módulos**:
- Gestionar Lotes
- Consultas de Clientes
- Reportes
- Galería y Documentos
- Configuración

## 📞 Contacto

- **WhatsApp**: +52 8184606294
- **Email**: josefraige@gmail.com
- **Horario**: Lunes-Viernes 9-6, Sábados 9-1

## 📝 Scripts Disponibles

```bash
npm run dev         # Inicia servidor de desarrollo
npm run build       # Compilar para producción
npm start           # Inicia servidor en producción
npm run lint        # Ejecutar linter
```

## 🚀 Deployment

### Vercel (Recomendado)
1. Push a GitHub: `git push origin main`
2. Crea proyecto en [Vercel.com](https://vercel.com)
3. Conecta con GitHub
4. Agrega variables de entorno
5. Deploy automático

Ver guía completa en: `DEPLOY-AUTOMATICO.md`

## 📚 Documentación Adicional

- `DEPLOY-PASO-A-PASO.sh` - Script interactivo de deployment
- `ESTADO-FINAL.txt` - Resumen completo del proyecto
- `ARQUITECTURA.html` - Diagrama técnico

## 📄 License

Proyecto privado TRAKWERK 2026

## 👨‍💻 Desarrollado por

Claude Code - Anthropic

---

**Estado**: 🟢 Listo para producción  
**Última actualización**: Julio 2026
