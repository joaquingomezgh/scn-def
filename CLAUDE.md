# Supercarnes Néstor - Web Hub

## 1. Propósito del Proyecto
Este sitio web es una **landing page y hub digital para Supercarnes Néstor**, una red de muchas sucursales de carnicerías. El objetivo es ofrecer una plataforma moderna, ágil y mobile-first donde los clientes puedan conocer la propuesta de la marca, consultar la historia de la empresa, encontrar rápidamente direcciones, horarios y ubicaciones en Google Maps de cada sucursal, y contactarse de forma directa.

## 2. Stack Tecnológico
- **Framework:** Next.js (App Router, TypeScript).
- **Estilos:** Tailwind CSS.
- **Íconos:** Lucide React.
- **Despliegue:** Cloudflare Workers con OpenNext. Ver la sección 6.

## 3. Reglas de Desarrollo & Vibe Coding
- **Filosofía:** Código limpio, legible y modular. Aplicar principios de simplicidad (no sobreingeniería, evitar librerías pesadas innecesarias).
- **Enfoque UI/UX:** Mobile-First obligatorio. Diseño limpio, moderno e intuitivo orientado al rubro comercial/gastronómico.
- **Uso de /frontend-design:** Aplicar las reglas de la skill de /frontend-design activa para trabajar toda la parte gráfica.
- **Idioma:** Comentarios en el código y mensajes de commit en español.

## 4. Comandos Principales
- `npm run dev` - Iniciar servidor de desarrollo local.
- `npm run build` - Verificar que la compilación de producción no tenga errores.
- `npm run lint` - Ejecutar linter de código.
- `npm run preview` - Compilar y probar el sitio en local con el motor de Cloudflare.
- `npm run deploy` - Compilar y publicar el sitio en Cloudflare.

## 5. Estructura de Datos
- Las sucursales se gestionan de forma centralizada en `src/data/branches.ts` (contiene nombre, dirección, ciudad, horario y coordenadas/link a Google Maps).
- Los encargos y reservas van a **un solo WhatsApp, el de la central** (`src/data/contact.ts`), que después le indica al cliente en qué sucursal retirar. Las sucursales no tienen número propio en la web: todo contacto va a ese WhatsApp.
- **Fotos de los productos en oferta:** hay una biblioteca de cortes reutilizable.
  - `marketing/cortes-originales/`: las fotos originales que junta el usuario, con nombres orientativos (`vacio.png`, `pata-muslo.png`). No se publican.
  - `public/ofertas/<mismo-nombre>.webp`: la versión recortada sin fondo, mejorada y lista para la web. Cada oferta la usa con `image: "/ofertas/vacio.webp"`.
  - Para procesar fotos nuevas: `marketing/procesar-cortes.py` (las instrucciones están en su encabezado). Revisá cada recorte antes de usarlo.
  - Si un producto no tiene foto, la cartulina se muestra sin imagen. No borres fotos de la biblioteca aunque hoy no estén en oferta.

## 6. Hosting y Ramas
- **Hosting:** Cloudflare Workers, en https://supercarnesnestor.com (dominio comprado en Cloudflare Registrar y conectado en `wrangler.jsonc`). `www.supercarnesnestor.com` redirige al dominio sin www con un `redirects()` en `next.config.ts` (no depende del panel de Cloudflare). La dirección vieja de workers.dev está apagada; para ver cambios antes de publicar se usa `npm run preview`.
- **Dirección pública en el código:** solo en `src/data/site.ts` (`SITE_URL`).
- **Rama de trabajo:** `main`.
- **Publicar:** GitHub todavía no está conectado a Cloudflare, así que `git push` no publica. Hay que correr `npm run deploy` con una sesión de Wrangler iniciada.
- **Versión anterior a Cloudflare:** queda guardada en el tag `respaldo-vercel-2026-11-04`.
- **Vercel:** no se usa. Sus menciones en ese tag y en commits viejos son historia, no instrucciones.

## 7. Sin Dependencia de Cloudflare
El sitio tiene que poder mudarse a otro hosting cambiando solo la configuración de despliegue, sin reescribir la aplicación.
- **Lo específico de Cloudflare va solo en la configuración:** `wrangler.jsonc`, `open-next.config.ts`, `public/_headers` y los scripts de despliegue.
- **En `src/` solo Next.js y estándares web:** nada de `getCloudflareContext`, imports `cloudflare:*`, `env` de Workers ni URLs `/cdn-cgi/`. Las imágenes van con `next/image`, sin un loader de Cloudflare.
- **No usar servicios propios de Cloudflare para la aplicación:** KV, D1, R2, Durable Objects, Queues, Workers AI o similares. Si hace falta guardar datos o archivos, elegir una opción que funcione en cualquier hosting.
- **Excepciones:** si una función no se puede resolver sin atarse a Cloudflare, frenar y consultarlo con el usuario antes de implementarla.
