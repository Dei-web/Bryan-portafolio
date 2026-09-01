# Portafolio Bryan — Diseñador Gráfico & Artista Digital

## Estructura

- `src/` — SPA React (Vite)
- `worker/` — API de Cloudflare Workers (Hono + Supabase + R2)
- `public/imagenes/` — imágenes de referencia
- `supabase/schema.sql` — esquema de base de datos

## Requisitos

1. **Node.js 18+** y **npm**
2. **Cloudflare account**:
   - Crear un bucket R2 llamado `brxan-portfolio` (acceso público habilitado).
   - Obtener el `R2_ACCOUNT_ID`.
   - Autenticar `wrangler`: `wrangler login`
3. **Supabase**:
   - Crear un proyecto.
   - Ejecutar `supabase/schema.sql` (`supabase db reset --script supabase/schema.sql` o en el editor SQL).
   - Obtener `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
4. **Wrangler** instalado (`npm i -g wrangler` o el que viene con el proyecto).

## Configuración

Copiar `worker/.env.example` a `worker/.env` y rellenar:

```bash
cp worker/.env.example worker/.env
# Editar worker/.env:
# R2_ACCOUNT_ID=
# ADMIN_PASSWORD=
# SUPABASE_URL=
# SUPABASE_SERVICE_ROLE_KEY=
```

Subir el servicio_role key como secreto recomendado (opcional en dev):

```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

## Variables de entorno

Todas las conexiones se resuelven desde las variables de entorno del Workers (`R2_ACCOUNT_ID`, `ADMIN_PASSWORD`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). El usuario reemplaza los valores en `worker/.env`.

## Desarrollo local

**Terminal 1** — API (Worker con bindings reales):

```bash
cd worker
npm install
npm run dev
```

El Worker escucha en `http://localhost:8787`.

**Terminal 2** — SPA (Vite):

```bash
cd ..
npm install
npm run dev
```

La SPA corre en `http://localhost:5173`. El proxy `/api` se conecta al Worker.

## Subir imágenes a R2 (seed)

```bash
cd worker
bash seed.sh
```

Esto sube las 6 imágenes de `public/imagenes/` a R2 (claves `imagenes/*`) y
emite el SQL de seed en salida estándar:

```bash
bash seed.sh > ../supabase/seed.sql
```

Luego ejecutar `supabase/seed.sql` en Supabase para crear los 4 proyectos de prueba.

## Producción (local)

```bash
npm run build
```

## Admin

- Ruta: `/admin`
- Contraseña: la definida en `ADMIN_PASSWORD`.
- Acciones: crear/editar/eliminar proyectos (sube imágenes a R2), ver y eliminar comentarios.

## Arquitectura

- **R2**: almacena las imágenes. URLs públicas: `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com/<key>`.
- **Supabase**: proyectos, imágenes y comentarios.
- **Worker**: proxy entre SPA y R2/Supabase.
- **SPA**: landing, páginas de proyecto, panel de administración.
# Bryan-portafolio
