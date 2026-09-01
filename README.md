# brxan.art - Portafolio de Diseno Grafico & Arte Digital

Portafolio web profesional para **Bryan** - Disenador Grafico, Ilustrador Digital y artista visual. Aplicacion SPA construida con **React 19** + **Vite**, desplegada en **Vercel**, con API serverless en **Cloudflare Workers**, almacenamiento de imagenes en **Cloudflare R2** y base de datos en **Supabase**.

![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff?logo=vite&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-4.x-F38020?logo=cloudflare&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.45-3ECF8E?logo=supabase&logoColor=white)
![Cloudflare R2](https://img.shields.io/badge/Cloudflare%20R2-Object%20Storage-F38020?logo=cloudflare&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-SPA%20Deploy-000?logo=vercel&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-4.6-ff5f0f?logo=hono&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-API-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

---

## Arquitectura en la nube

El proyecto sigue una arquitectura **serverless de tres capas** con coste operativo de **$0/mes** dentro de los planes gratuitos de cada proveedor.

```
                   +---------------------------+
                   |       USUARIO FINAL       |
                   +-------------+-------------+
                                 |
                                 | HTTPS
                                 v
              +-------------------------------------+
              |          VERCEL (CDN Global)        |
              |   React SPA + Rewrites (/api ->)    |
              |   bryan-portafolio.vercel.app       |
              +-------------------------------------+
                   |                        |
            HTML/CSS/JS             /api/* (rewrite)
                   |                        |
                   v                        v
            +-------------+    +---------------------------+
            |  Navegador  |    |  CLOUDFLARE WORKERS       |
            |  (SPA)      |    |  Serverless API (Hono)    |
            +-------------+    |  brayan-api.*.workers.dev |
                               +-----------+---------------+
                                           |
                              +------------+-------------+
                              |                          |
                              v                          v
                 +---------------------+    +------------------------+
                 |     SUPABASE        |    |    CLOUDFLARE R2       |
                 |  PostgreSQL + REST  |    |   Object Storage       |
                 |  (proyectos,        |    |   (imagenes, portadas, |
                 |   comentarios)      |    |    archivos de usuario)|
                 +---------------------+    +------------------------+
                              |                          |
                              v                          v
                       Acceso via                  URLs publicas
                    service_role key              pub-*.r2.dev
```

### Por que esta arquitectura

- **Escalabilidad infinita sin servidor**: ni Vercel ni Workers requieren gestionar infraestructura.
- **Baja latencia global**: Workers corre en 300+ edge locations de Cloudflare; Vercel distribuye el CDN mundialmente.
- **Coste cero**: todos los servicios operan dentro de planes gratuitos generosos para un portafolio.
- **Seguridad**: credenciales sensibles (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`) viven como secrets encriptados en Cloudflare, nunca en el bundle del frontend.
- **Desacoplamiento**: frontend y API son repositorios/proyectos independientes con ciclos de vida separados.

---

## Stack tecnologico

### Frontend
| Tecnologia | Uso |
|---|---|
| **React 19** | UI con Hooks y Context API |
| **Vite 6** | Build ultrarapido con HMR |
| **React Router 7** | Rutas SPA (`/`, `/proyecto/:id`, `/admin/*`) |
| **CSS nativo** | Estilos con variables CSS y media queries |

### Backend (Cloudflare Worker)
| Tecnologia | Uso |
|---|---|
| **Hono 4** | Framework web ultraligero para Workers |
| **TypeScript** | Tipado estatico |
| **@supabase/supabase-js** | Cliente Supabase con `service_role` |
| **Wrangler 4** | CLI de Cloudflare para deploy y desarrollo |

### Infraestructura
| Servicio | Proveedor | Funcion |
|---|---|---|
| **Vercel** | Vercel Inc. | Hosting SPA, CDN global, rewrites |
| **Cloudflare Workers** | Cloudflare | API serverless (edge runtime) |
| **Cloudflare R2** | Cloudflare | Almacenamiento de objetos S3-compatible |
| **Supabase** | Supabase Inc. | Base de datos PostgreSQL + API REST |

---

## Estructura del proyecto

```
portafolio_bryan/
|
|-- src/                          # SPA React
|   |-- App.jsx                   # Router principal
|   |-- main.jsx                  # Entry point
|   |-- index.css                 # Estilos globales
|   |-- components/
|   |   |-- Admin/                # Panel de administracion
|   |   |   |-- index.jsx         # Router anidado del admin
|   |   |   |-- AdminLayout.jsx   # Layout con tabs
|   |   |   |-- PasswordGate.jsx  # Login por contrasena
|   |   |   |-- ProjectList.jsx   # CRUD de proyectos
|   |   |   |-- ProjectForm.jsx   # Crear/editar proyecto
|   |   |   |-- CommentsTab.jsx   # Gestion de comentarios
|   |   |   +-- ImageUploader.jsx # Subida a R2
|   |   |-- ProjectPage.jsx       # Detalle con modal
|   |   |-- PinDetail.jsx         # Modal imagen + comentarios
|   |   |-- ProjectsCovers.jsx    # Grilla de portadas
|   |   |-- Landing.jsx, Hero.jsx, About.jsx, ...
|   |   +-- ...
|   |-- context/
|   |   +-- AdminContext.jsx      # Estado global de sesion admin
|   |-- hooks/
|   |   |-- useApi.js             # Cliente fetch con preflight /api
|   |   |-- useProjects.js        # Hook de proyectos
|   |   +-- useComments.js        # Hook de comentarios
|   +-- data/
|       +-- data.js               # Contenido estatico (perfil, servicios)
|
|-- worker/                       # Cloudflare Worker (API)
|   |-- src/
|   |   +-- index.ts              # Hono app: rutas /api/*
|   |-- wrangler.toml             # Config del Worker (bindings, vars)
|   |-- .env                      # Credenciales locales (no se commitea)
|   |-- .env.example              # Plantilla de variables
|   |-- seed.sh                   # Subida de imagenes a R2 + generacion SQL
|   +-- package.json
|
|-- public/imagenes/              # Assets publicos (favicon, logos seed)
|-- supabase/
|   +-- schema.sql                # Esquema de la base de datos
|-- vercel.json                   # Rewrites SPA + proxy a Workers
|-- vite.config.js                # Config Vite (dev proxy, plugins)
|-- index.html                    # Shell HTML
+-- package.json                  # Dependencias frontend
```

---

## Implementacion en la nube (detalles tecnicos)

### 1. Cloudflare Workers - API serverless

El Worker en `worker/src/index.ts` expone una API REST bajo el framework **Hono** con los siguientes endpoints:

```
POST   /api/upload              Subir imagen a R2 (multipart/form-data)
GET    /api/projects            Listar proyectos (con imagenes anidadas)
GET    /api/projects/:id        Detalle de proyecto
POST   /api/projects            Crear proyecto (requiere x-admin-password)
PUT    /api/projects/:id        Actualizar proyecto (requiere x-admin-password)
DELETE /api/projects/:id        Eliminar proyecto + imagenes R2 (requiere x-admin-password)
GET    /api/comments            Listar comentarios (query: projectId, imageIndex)
POST   /api/comments            Crear comentario
DELETE /api/comments/:id        Eliminar comentario (requiere x-admin-password)
POST   /api/admin/login         Login con contrasena
```

**Bindings configurados en `wrangler.toml`:**
- `R2_BUCKET` -> bucket `brxan-portfolio` (acceso directo desde el Worker)
- `R2_ACCOUNT_ID` -> ID de cuenta Cloudflare (para construir URLs S3)
- `R2_PUBLIC_URL` -> URL publica del bucket `pub-*.r2.dev`
- `SUPABASE_URL` -> endpoint del proyecto Supabase

**Secrets (encriptados en Cloudflare, nunca en el repo):**
- `ADMIN_PASSWORD` - Contrasena del panel de administracion
- `SUPABASE_SERVICE_ROLE_KEY` - Credencial maestra de Supabase

### 2. Cloudflare R2 - Almacenamiento de imagenes

- Bucket: **`brxan-portfolio`**
- Acceso publico habilitado via URL de desarrollo `pub-97d4743707de4241a0db9f49705efdce.r2.dev`
- Estructura de claves: `imagenes/<archivo>.png` y `proyectos/<project_id>/<uuid>-<nombre>`
- El Worker usa el binding `R2_BUCKET` para operaciones `put/delete/list` sin necesidad de S3 API keys
- URLs publicas servidas directamente desde el edge de Cloudflare (sin egress fees)

### 3. Supabase - Base de datos PostgreSQL

Tres tablas con relaciones en cascada (`ON DELETE CASCADE`):

```sql
projects         -> portada, metadata del proyecto
project_images   -> imagenes asociadas con orden (position)
comments         -> comentarios por imagen (author, text, image_index)
```

- **Row Level Security deshabilitado** (el Worker opera con `service_role`)
- API REST automatica de Supabase disponible como fallback
- Backup automatico diario incluido en plan gratuito

### 4. Vercel - Hosting del frontend

- **Framework detectado**: Vite
- **Build command**: `npm run build` -> genera `dist/`
- **CDN global** con purga automatica en cada deploy
- **Deploy automatico** desde `main` en cada push a GitHub

El archivo `vercel.json` configura dos rewrites criticos:

```json
{
  "rewrites": [
    { "source": "/api/:path*",
      "destination": "https://brayan-api.deilerc27.workers.dev/api/:path*" },
    { "source": "/(.*)",
      "destination": "/index.html" }
  ]
}
```

- **Primer rewrite**: todas las llamadas `/api/*` del frontend se transparentan hacia el Worker de Cloudflare. El codigo del frontend no necesita saber donde vive la API.
- **Segundo rewrite**: routing SPA. Cualquier ruta desconocida retorna `index.html` para que React Router tome el control.

---

## URLs de produccion

| Servicio | URL |
|---|---|
| Frontend (Vercel) | `https://bryan-portafolio.vercel.app` (o similar) |
| API (Workers) | `https://brayan-api.deilerc27.workers.dev` |
| Imagenes (R2 publico) | `https://pub-97d4743707de4241a0db9f49705efdce.r2.dev` |
| Dashboard Supabase | `https://supabase.com/dashboard/project/qwnefclkyuyboukkvqhb` |
| Repo GitHub | `https://github.com/Dei-web/Bryan-portafolio` |

---

## Desarrollo local

### Prerequisitos

- Node.js 18+
- Cuenta en Cloudflare con `wrangler` autenticado (`npx wrangler login`)
- Proyecto Supabase creado con `supabase/schema.sql` ejecutado

### Configuracion inicial

```bash
# 1. Clonar el repositorio
git clone https://github.com/Dei-web/Bryan-portafolio.git
cd Bryan-portafolio

# 2. Instalar dependencias del frontend
npm install

# 3. Instalar dependencias del worker
cd worker
npm install

# 4. Configurar variables de entorno locales
cp .env.example .env
# Editar .env con tus credenciales:
#   R2_ACCOUNT_ID=
#   ADMIN_PASSWORD=
#   SUPABASE_URL=
#   SUPABASE_SERVICE_ROLE_KEY=

# 5. (Opcional) Subir secrets a Cloudflare
echo "tu-password" | npx wrangler secret put ADMIN_PASSWORD
echo "tu-service-role-key" | npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

### Ejecutar en desarrollo

**Terminal 1** - Worker (API en `http://localhost:8787`):

```bash
cd worker
npx wrangler dev --port 8787
```

**Terminal 2** - Frontend (SPA en `http://localhost:5175`):

```bash
npm run dev
```

El proxy de Vite (`vite.config.js`) redirige `/api/*` al Worker local. Abre `http://localhost:5175` y el panel admin en `http://localhost:5175/admin`.

### Seed de datos iniciales

Para cargar las imagenes al bucket R2 y obtener el SQL de seed:

```bash
cd worker
bash seed.sh
```

El script sube las imagenes de `public/imagenes/` a R2 y genera el SQL para insertar en Supabase (proyectos `aaa1`-`aaa4`).

---

## Deploy a produccion

### Worker (Cloudflare)

```bash
cd worker

# 1. Actualizar wrangler.toml con el nombre de tu Worker
# 2. Subir secretos (si no estan ya)
echo "tu-password" | npx wrangler secret put ADMIN_PASSWORD
echo "tu-key" | npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# 3. Deploy
npx wrangler deploy
```

### Frontend (Vercel)

1. Importar el repo en [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite** (auto-detectado)
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Deploy

Cada push a `main` dispara un deploy automatico.

---

## Panel de administracion

Acceso: `/admin`

- Login con contrasena definida en `ADMIN_PASSWORD` (almacenada en sessionStorage)
- Funciones:
  - **Crear proyectos** con titulo, categoria, descripcion, portada e imagenes
  - **Subir imagenes** a R2 via endpoint `/api/upload` (autenticado con header `x-admin-password`)
  - **Editar proyectos** existentes (reemplaza imagenes y elimina las antiguas de R2)
  - **Eliminar proyectos** en cascada (DB + R2)
  - **Gestionar comentarios** de usuarios (filtrar por proyecto/imagen, eliminar)

---

## Variables de entorno

### Worker (Cloudflare)

| Variable | Tipo | Ubicacion |
|---|---|---|
| `R2_ACCOUNT_ID` | Var | `wrangler.toml` [vars] |
| `R2_PUBLIC_URL` | Var | `wrangler.toml` [vars] |
| `SUPABASE_URL` | Var | `wrangler.toml` [vars] |
| `ADMIN_PASSWORD` | Secret | `wrangler secret put` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | `wrangler secret put` |

### Frontend (Vercel)

No requiere variables de entorno. El `vercel.json` inyecta la URL del Worker via rewrite.

### Local

`worker/.env` replica las variables de Cloudflare para desarrollo con `wrangler dev` local.

---

## Scripts disponibles

### Frontend (raiz)

| Comando | Descripcion |
|---|---|
| `npm run dev` | Dev server Vite en puerto 5175 |
| `npm run build` | Build de produccion a `dist/` |
| `npm run preview` | Servir build de produccion localmente |

### Worker (`worker/`)

| Comando | Descripcion |
|---|---|
| `npm run dev` / `npx wrangler dev` | Dev server local |
| `npm run build` / `npx wrangler deploy` | Deploy a produccion |
| `bash seed.sh` | Subir imagenes + generar SQL de seed |

---

## Seguridad

- `ADMIN_PASSWORD` y `SUPABASE_SERVICE_ROLE_KEY` **nunca** se exponen al cliente (son secrets del Worker)
- `.env` y `.env.*` estan en `.gitignore` (excepto `.env.example`)
- CORS configurado en el Worker (actualmente `origin: '*'` - restringir a dominio Vercel en produccion)
- RLS deshabilitado en Supabase (el Worker opera con service_role); evaluar habilitar RLS con polit JWT para acceso publico directo

---

## Roadmap / Mejoras futuras

- [ ] Dominio personalizado `brxan.art` (Cloudflare Registrar -> Vercel + R2 custom domain)
- [ ] CORS restringido al dominio de Vercel
- [ ] Rate limiting en endpoints de creacion de comentarios
- [ ] Habilitar RLS en Supabase con politicas por tabla
- [ ] Autenticacion admin via JWT en lugar de header plano
- [ ] Sistema de likes por proyecto
- [ ] Optimizacion de imagenes en subida (resize/WebP)
- [ ] Analytics integrados (Plausible o Cloudflare Web Analytics)

---

## Licencia

Proyecto privado. Todos los derechos reservados - Bryan (brxan.art).

---

**Hecho con React + Vite, desplegado en Vercel, potenciado por Cloudflare Workers, R2 y Supabase.**
