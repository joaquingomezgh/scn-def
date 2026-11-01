---
name: ofertas-semana
description: >
  Carga, cambia o quita las ofertas de la semana de Supercarnes Néstor (una tanda de 6 o 7 productos con
  cuenta regresiva) y las publica en la web. Usar cuando el usuario dice "/ofertas-semana", "ofertas de la semana",
  "Néstor mandó las ofertas", "cargá las ofertas" o pasa una lista de productos con precios o la foto de un cartel.
argument-hint: "[lista de ofertas | cambio puntual | ruta de una foto | quitar]"
---

# /ofertas-semana

El panel tiene **dos estados**, y los dos se controlan sólo desde `src/data/weeklyOffers.ts`:

- **Sin ofertas:** `export const weeklyOffers: WeeklyOffers | null = null;` → no aparece el panel. Si tampoco hay oferta especial, se van también la sección «Ofertas» y su link del menú.
- **Con ofertas:** `weeklyOffers` es un objeto → aparece la pared de cartulinas con la cuenta regresiva.

El diseño vive en `src/components/WeeklyOffers.tsx` y **no se toca** en este comando: sólo se cambian los datos.
Así el panel sale siempre igual. Los colores, la inclinación y el tamaño de las cartulinas se calculan solos.
Las cartulinas van siempre en los tonos rojos de la carnicería (carmesí, bordó, salmón y rosado carne): no uses colores fluo.
Al pasar `endsAt` el panel se oculta en el navegador, sin volver a publicar.

Si el dueño promociona **un solo producto**, es `/oferta`, no este comando. Las dos pueden estar activas a la vez.

## Campos de `weeklyOffers`

| Campo    | Obligatorio | Ejemplo / regla |
|----------|-------------|-----------------|
| `endsAt` | sí | ISO con huso argentino: `"2026-11-07T21:00:00-03:00"`. Si no dicen hasta cuándo, cerrá el **próximo sábado a las 21:00**, porque la mayoría de las sucursales no abre el domingo. Si dicen sólo el día, a las 21:00. Fechas relativas ("hasta el domingo") se calculan desde la fecha de hoy. Tiene que ser futura. Si hoy es sábado o domingo y no lo aclararon, preguntá. |
| `terms`  | sí | Por defecto `"En todas las sucursales o hasta agotar stock."`. Si es sólo en algunas sucursales, nombrarlas usando `src/data/branches.ts`. |
| `items`  | sí | Lista de productos, normalmente 6 o 7. Con más de 8 la pared se hace larga: avisá y preguntá si recortar. |

Cada elemento de `items`:

| Campo     | Obligatorio | Ejemplo / regla |
|-----------|-------------|-----------------|
| `product` | sí | `"Vacío"`, `"Pollo entero"`. Con mayúscula inicial y hasta ~22 caracteres: es lo que se lee de lejos. |
| `price`   | sí | Número entero en pesos, sin puntos: `10900`. |
| `unit`    | sí | Por defecto `"el kilo"`. Otras: `"la unidad"`, `"la docena"`, `"la bandeja"`. |
| `note`    | no | Condición corta de hasta ~20 caracteres: `"Llevando 2 kilos"`. Sólo si la dieron. |

El panel **no muestra precios anteriores ni porcentajes de descuento**: si el dueño los manda, se ignoran y se carga sólo el precio de oferta.

Respetá el orden que mandó el dueño. Sin orden claro, poné primero los cortes de parrilla.

## Pasos para cargar o cambiar las ofertas

1. Leé `src/data/weeklyOffers.ts`. Si la tanda actual todavía está vigente, avisá que se va a reemplazar.
2. Juntá los datos del mensaje. Pueden venir como texto copiado de WhatsApp o como foto de un cartel: si pasan la ruta de una imagen, leéla y sacá los productos y precios de ahí.
3. Preguntá **en un solo mensaje** sólo lo que falte de lo obligatorio (un producto sin precio, por ejemplo). No preguntes lo que tiene valor por defecto. Si un precio se lee mal en una foto, preguntalo: un precio equivocado se publica.
4. Reemplazá el objeto `weeklyOffers` completo. No cambies los tipos ni los comentarios del archivo.
5. Corré `npm run lint`.
6. Si el navegador de preview está disponible, abrí la página en `#ofertas-semana`, revisá la pared en mobile (375 px) y en escritorio, y mostrale una captura al usuario.
7. Mostrá un resumen corto (lista de productos con precio, hasta cuándo, condiciones) y pedí confirmación para publicar.
8. Con el «sí», publicá (ver «Publicar»).

## Modificar la tanda actual

Cuando piden un cambio puntual ("el vacío es 11200", "sacá el pollo", "agregá costilla a 9500", "extendelas hasta el domingo"):

1. Leé `src/data/weeklyOffers.ts`. Si está en `null` o ya venció, avisá: no hay tanda para modificar, hay que cargar una nueva.
2. Cambiá **sólo** lo que pidieron y dejá el resto igual. Cada `product` tiene que ser único en la lista.
3. Si al sacar productos no queda ninguno, seguí los pasos de «Quitar las ofertas».
4. Seguí desde el paso 5 de «Pasos para cargar o cambiar las ofertas». El mensaje de commit es `Actualizar ofertas de la semana: <qué cambió>`.

## Quitar las ofertas (`/ofertas-semana quitar`)

1. Dejá `export const weeklyOffers: WeeklyOffers | null = null;` (manteniendo los tipos y los comentarios del archivo).
2. Confirmá con el usuario y publicá.

No hace falta quitarlas cuando vencen: se ocultan solas.

## Publicar

1. Verificá que estás en `main`, con `src/components/WeeklyOffers.tsx` presente, y traé lo último: `git pull --ff-only`. Si estás en otra rama, no publiques ni cambies de rama por tu cuenta: avisá al usuario y preguntá cómo seguir.
2. Hacé commit **sólo** de `src/data/weeklyOffers.ts`, con mensaje en español:
   - `Cargar ofertas de la semana: <cantidad> productos hasta el <día>`
   - `Actualizar ofertas de la semana: <qué cambió>`
   - `Quitar ofertas de la semana`
3. `git push`. Vercel publica solo en uno o dos minutos.
4. Avisá al usuario que ya están publicadas y que en un par de minutos se ven en la web.
