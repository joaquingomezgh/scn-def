# Supercarnes Néstor - Web Hub

## 1. Propósito del Proyecto
Este sitio web es una **landing page y hub digital para Supercarnes Néstor**, una red de muchas sucursales de carnicerías. El objetivo es ofrecer una plataforma moderna, ágil y mobile-first donde los clientes puedan conocer la propuesta de la marca, consultar la historia de la empresa, encontrar rápidamente direcciones, horarios, teléfonos y ubicaciones en Google Maps de cada sucursal, y contactarse de forma directa.

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
- Las sucursales se gestionan de forma centralizada en `src/data/branches.ts` (contiene nombre, dirección, ciudad, horario, teléfono y coordenadas/link a Google Maps).

## 6. Hosting y Ramas
- **Hosting:** Cloudflare Workers, en https://supercarnes-nestor.supercarnes-nestor.workers.dev (todavía sin dominio propio).
- **Rama de trabajo:** `prueba-cloudflare`. Todo el trabajo nuevo va acá.
- **Publicar:** GitHub todavía no está conectado a Cloudflare, así que `git push` no publica. Hay que correr `npm run deploy` con una sesión de Wrangler iniciada.
- **`main` está congelada:** es el respaldo previo a la mudanza y GitHub rechaza cualquier cambio. No trabajar ni commitear ahí. El tag `respaldo-vercel-2026-11-04` marca ese mismo punto.
- **Vercel:** no es el hosting actual. Sus menciones en `main` y en commits viejos son historia, no instrucciones.
