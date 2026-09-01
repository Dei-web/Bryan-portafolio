#!/usr/bin/env bash
set -euo pipefail
cd "${BASH_SOURCE%/*}"
source .env

ACC="$R2_ACCOUNT_ID"
BASE="https://${ACC}.r2.cloudflarestorage.com"
declare -A URLs

FILES=(logo-ghost.png logo-ghost-app.png proyecto-anime-universe.png proyecto-high.png proyecto-serendipia.png retrato.jpg)

for f in "${FILES[@]}"; do
  key="imagenes/$f"
  echo "Subiendo $key ..."
  npx wrangler r2 object put "brxan-portfolio/$key" --file="../public/imagenes/$f" --remote
  URLs["$f"]="${BASE}/${key}"
done

ACC2="$R2_ACCOUNT_ID"
BASE2="https://pub-99f42c21fe074edd982d045210f4acdd.r2.dev"
URL_ANIME="${BASE2}/imagenes/proyecto-anime-universe.png"
URL_HIGH="${BASE2}/imagenes/proyecto-high.png"
URL_SERENDIPIA="${BASE2}/imagenes/proyecto-serendipia.png"
URL_LOGO_APP="${BASE2}/imagenes/logo-ghost-app.png"
URL_LOGO="${BASE2}/imagenes/logo-ghost.png"

cat <<SQL
-- Ejecuta este SQL en Supabase después de subir los archivos con seed.sh.
INSERT INTO projects (id, title, category, description, cover_url, created_at) VALUES
('aaa1', 'Anime Universe', 'Ilustración · Fan-art', 'Serie de ediciones y fan-arts con estética anime: composición, color y tipografía para piezas de impacto.', '${URL_ANIME}', now()),
('aaa2', 'HIGH', 'Edición · Arte digital', 'Exploración de arte digital sci-fi con tipografía brush aplicada sobre ilustración y efectos de partículas.', '${URL_HIGH}', now()),
('aaa3', 'Serendipia', 'Identidad visual · Logo', 'Identidad visual con lettering blackletter: concepto, logotipo y aplicaciones gráficas de la marca.', '${URL_SERENDIPIA}', now()),
('aaa4', 'brxan.art — Marca personal', 'Branding · Logo', 'Construcción de mi marca personal: el fantasma como símbolo, versiones de logo y paleta verde sobre morado.', '${URL_LOGO_APP}', now());

INSERT INTO project_images (id, project_id, url, description, position) VALUES
('b1', 'aaa1', '${URL_ANIME}', 'Edición especial — fan-art, composición y retoque digital.', 0),
('b2', 'aaa2', '${URL_HIGH}', 'Pieza digital con tipografía brush sobre arte sci-fi.', 0),
('b3', 'aaa3', '${URL_SERENDIPIA}', 'Logotipo blackletter con composición de elementos óseos.', 0),
('b4', 'aaa4', '${URL_LOGO}', 'El fantasma de la marca sobre fondo claro.', 0),
('b5', 'aaa4', '${URL_LOGO_APP}', 'Versión app icon sobre morado profundo.', 1);
SQL
