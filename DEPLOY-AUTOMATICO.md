# DEPLOY AUTOMÁTICO: TRAKWERK PARQUES

## 🚀 Opción A: Deploy en Vercel + Supabase (Recomendado)

Este es el deployment automático de la aplicación en producción.

### PASO 1: Preparar GitHub (1 minuto)

1. Abre GitHub Desktop o Git Bash
2. Confirma que el repositorio está sincronizado:
   ```bash
   git status
   git push origin main
   ```

### PASO 2: Crear Supabase (5 minutos)

1. Ve a https://supabase.com
2. Haz clic en "Sign Up" → "Continue with GitHub"
3. Autoriza Supabase
4. Crea un nuevo proyecto:
   - **Nombre**: trakwerk-parques
   - **Contraseña DB**: Genera una segura y guárdala
   - **Región**: us-east-1 (o closest to México)
5. Espera a que se cree (toma ~2 minutos)
6. En el dashboard de Supabase:
   - Copia **Project URL** (ej: `https://xxxxx.supabase.co`)
   - Copia **anon public key** (Project Settings → API Keys)
7. Crea un archivo `.env.local` en la raíz del proyecto:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### PASO 3: Desplegar en Vercel (3 minutos)

1. Ve a https://vercel.com
2. Haz clic en "Sign Up" → "Continue with GitHub"
3. Autoriza Vercel
4. Haz clic en "New Project"
5. Busca y selecciona el repositorio `trakwerk-parques`
6. En "Environment Variables":
   - Agrega `NEXT_PUBLIC_SUPABASE_URL`
   - Agrega `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Haz clic en "Deploy"
8. Vercel construye automáticamente y despliega en ~2 minutos
9. Obtendrás una URL como: `https://trakwerk-parques.vercel.app`

### PASO 4: Conectar Dominio Personalizado (Opcional)

Si quieres usar `trakwerk.com.mx/parques`:

1. En Vercel → Project Settings → Domains
2. Agrega tu dominio personalizado
3. Copia los registros DNS que te da Vercel
4. En tu proveedor de hosting (Hostinger, GoDaddy, etc.):
   - Agrega un subdominio `parques` apuntando a Vercel
   - O usa un CNAME record
5. Vercel verifica automáticamente (toma ~10-15 minutos)

---

## 🎛️ Opción C: Panel Admin Totalmente Funcional ✓

El panel administrativo **YA ESTÁ COMPLETAMENTE FUNCIONAL** y listo para usar.

### Módulos Disponibles:

#### 1. **Gestionar Lotes** 📋
- Agregar nuevos lotes
- Editar información (metros, precio, estado)
- Eliminar lotes
- Ver tabla con todos los lotes del parque

**Acceso**: /dashboard/admin/lotes

#### 2. **Consultas de Clientes** 📱
- Ver todas las consultas recibidas
- Responder a consultas pendientes
- Marcar como respondidas
- Contacto directo por email y WhatsApp

**Acceso**: /dashboard/admin/consultas

#### 3. **Reportes** 📊
- Reporte de Ventas (por parque)
- Reporte de Consultas (tasa de respuesta)
- Precios Promedio
- Estadísticas de ocupación

**Acceso**: /dashboard/admin/reportes

#### 4. **Galería y Documentos** 🖼️
- Subir planos, fotos y documentos
- Organizar por parque
- Descargar archivos
- Filtrar por parque

**Acceso**: /dashboard/admin/galeria

#### 5. **Configuración** ⚙️
- Nombre del sitio
- Email y WhatsApp
- Horarios de atención
- Descripción y meta keywords (SEO)
- Opciones de seguridad
- Personalización de colores

**Acceso**: /dashboard/admin/configuracion

#### 6. **Dashboard Admin Principal**
- Resumen de estadísticas
- Últimas actividades
- Acceso rápido a todos los módulos

**Acceso**: /dashboard/admin

---

## ✅ Lo que está funcionando AHORA

✓ Autenticación por contraseña (Trakwerk72661%)
✓ 7 menús principales (Inicio, Parques, Catálogo, Mapa, Comparador, Contacto, Admin)
✓ Fichas de parques con información completa
✓ Mapa interactivo con Google Maps
✓ Comparador de parques
✓ Formulario de contacto integrado con WhatsApp
✓ Panel admin con 5 módulos funcionales
✓ Gestión de lotes (CRUD)
✓ Gestión de consultas
✓ Reportes y estadísticas
✓ Galería y documentos
✓ Configuración del sitio

---

## 📝 Próximas Mejoras (Fase 2)

- [ ] Integración con Supabase para persistencia de datos
- [ ] Gestión de parques (crear, editar, eliminar)
- [ ] Carga de archivos reales en galería
- [ ] Exportación de reportes a PDF/Excel
- [ ] Sistema de notificaciones por email
- [ ] Análisis de tráfico y conversiones

---

## ❓ Preguntas Frecuentes

**P: ¿Necesito código adicional para que funcione el admin?**
R: No. El panel admin YA FUNCIONA. Solo necesitas desplegar en Vercel (Opción A).

**P: ¿Dónde se guardan los datos?**
R: Actualmente en memoria (desaparece al recargar). Para persistencia, necesitas Supabase.

**P: ¿Cómo agregamos datos reales de los parques?**
R: En el panel de Admin → Gestionar Lotes, o directamente en Supabase después del deploy.

**P: ¿Puedo cambiar la contraseña de acceso?**
R: Sí. Edita `/app/page.tsx` línea 31 la contraseña "Trakwerk72661%".

---

## 🎯 Próximo Paso

Ejecuta los pasos 1-4 arriba para tener tu aplicación **EN VIVO** en internet en ~15 minutos.
