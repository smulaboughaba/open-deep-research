# Deep Research UI

Interfaz moderna de investigación con IA, inspirada en el experimento Deep Research de OpenAI, pero adaptada para funcionar exclusivamente con la API de Gemini (Google AI):

- **IA Pro**: modelo de texto avanzado
- **IA Vision**: modelo multimodal (texto e imagen)

## Características

- Fondo animado de estrellas en modo oscuro
- UI minimalista y personalizable
- Soporte para chat privado y público
- Persistencia de historial y usuarios (requiere Postgres)
- Despliegue fácil en Vercel

## Requisitos

- Node.js >= 18
- [pnpm](https://pnpm.io/) o npm
- Cuenta en [Google AI Studio](https://makersuite.google.com/app/apikey) para obtener tu API Key de Gemini
- Base de datos Postgres (puedes usar [Neon](https://neon.tech) o [Supabase](https://supabase.com))

## Variables de entorno necesarias

Crea un archivo `.env` en la raíz con:

```
GOOGLE_API_KEY=tu_api_key_de_google
REASONING_MODEL=gemini-pro
BYPASS_JSON_VALIDATION=false
POSTGRES_URL=tu_url_de_postgres
AUTH_SECRET=un_string_aleatorio_seguro
UPSTASH_REDIS_REST_URL=tu_url_de_redis
UPSTASH_REDIS_REST_TOKEN=tu_token_de_redis
BLOB_READ_WRITE_TOKEN=tu_token_de_vercel_blob
MAX_DURATION=300
```

## Instalación y uso local

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

La app estará disponible en [localhost:3000](http://localhost:3000/)

## Despliegue en Vercel

1. Sube este repositorio a tu cuenta de GitHub
2. Ve a [vercel.com/import](https://vercel.com/import) y conecta tu repo
3. Añade las variables de entorno necesarias en el panel de Vercel
4. ¡Listo! Tu app estará online y lista para usar

## Notas

- Solo se muestran los modelos "IA Pro" e "IA Vision" en la UI
- No se muestra el modelo de razonamiento, ni enlaces a Firecrawl, GitHub ni branding externo
- El fondo animado de estrellas es totalmente personalizable en el componente `components/starry-background.tsx`

---

**Autoría:** Genérica / Open Source
