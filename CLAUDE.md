# Supercarnes Néstor - Web Hub

## 1. Propósito del Proyecto
Este sitio web es una **landing page y hub digital para Supercarnes Néstor**, una red de muchas sucursales de carnicerías. El objetivo es ofrecer una plataforma moderna, ágil y mobile-first donde los clientes puedan conocer la propuesta de la marca, consultar la historia de la empresa, encontrar rápidamente direcciones, horarios, teléfonos y ubicaciones en Google Maps de cada sucursal, y contactarse de forma directa.

## 2. Stack Tecnológico
- **Framework:** Next.js (App Router, TypeScript).
- **Estilos:** Tailwind CSS.
- **Íconos:** Lucide React.
- **Despliegue:** Vercel via GitHub.

## 3. Reglas de Desarrollo & Vibe Coding
- **Filosofía:** Código limpio, legible y modular. Aplicar principios de simplicidad (no sobreingeniería, evitar librerías pesadas innecesarias).
- **Enfoque UI/UX:** Mobile-First obligatorio. Diseño limpio, moderno e intuitivo orientado al rubro comercial/gastronómico.
- **Uso de /frontend-design:** Aplicar las reglas de la skill de /frontend-design activa para trabajar toda la parte gráfica.
- **Idioma:** Comentarios en el código y mensajes de commit en español.

## 4. Comandos Principales
- `npm run dev` - Iniciar servidor de desarrollo local.
- `npm run build` - Verificar que la compilación de producción no tenga errores.
- `npm run lint` - Ejecutar linter de código.

## 5. Estructura de Datos
- Las sucursales se gestionan de forma centralizada en `src/data/branches.ts` (contiene nombre, dirección, ciudad, horario, teléfono y coordenadas/link a Google Maps).
