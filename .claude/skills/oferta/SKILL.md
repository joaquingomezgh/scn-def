---
name: oferta
description: >
  Carga, cambia o quita la oferta especial de Supercarnes Néstor y la publica en la web.
  Usar cuando el usuario dice "/oferta", "cargá la oferta", "nueva oferta", "sacá la oferta"
  o pasa los datos de una promo del dueño (producto, precio, hasta cuándo).
argument-hint: "[datos de la oferta | quitar]"
---

# /oferta

La web tiene **dos estados** para la oferta especial, y los dos se controlan sólo desde
`src/data/offer.ts`:

- **Sin oferta:** `export const offer: Offer | null = null;` → no aparece el cartel. Si tampoco hay ofertas de la semana, se van también la sección «Ofertas» y su link del menú.
- **Con oferta:** `offer` es un objeto → aparece el cartel fluo con la cuenta regresiva.

El diseño vive en `src/components/SpecialOffer.tsx` y **no se toca** en este comando: sólo se cambian los datos.
Al pasar `endsAt` la sección se oculta sola en el navegador, sin volver a publicar.

## Campos de `offer`

| Campo     | Obligatorio | Ejemplo / regla |
|-----------|-------------|-----------------|
| `product` | sí | `"Vacío"`. Nombre del corte, corto, con mayúscula inicial. |
| `detail`  | sí | Una frase de hasta ~60 caracteres. Si el usuario no la da, proponé una sobria sobre el corte (origen, cómo se corta o para qué sirve) y mostrála para confirmar. |
| `price`   | sí | Número entero en pesos, sin puntos: `9500`. |
| `before`  | no | Precio habitual. Si está, tiene que ser mayor que `price` (de ahí sale la estrella «−X%»). Si no hay, omitir el campo. |
| `unit`    | sí | Por defecto `"el kilo"`. Otras: `"la unidad"`, `"la docena"`, `"la bandeja"`. |
| `endsAt`  | sí | ISO con huso argentino: `"2026-11-15T21:00:00-03:00"`. Si dicen sólo el día, cerrar a las 21:00. Fechas relativas ("hasta el domingo") se calculan desde la fecha de hoy. Tiene que ser futura. |
| `terms`   | sí | Por defecto `"En todas las sucursales o hasta agotar stock."`. Si es sólo en algunas sucursales, nombrarlas usando `src/data/branches.ts`. |
| `image`   | no | Ruta pública de la foto: `"/ofertas/vacio-2026-11.jpg"`. Ver «Foto». |

## Pasos para cargar o cambiar una oferta

1. Leé `src/data/offer.ts` para ver la oferta actual.
2. Juntá los datos del mensaje del usuario. Preguntá **en un solo mensaje** sólo lo que falte de lo obligatorio (producto, precio, hasta cuándo). No preguntes lo que tiene valor por defecto.
3. Si hay foto, copiála como se explica en «Foto».
4. Reemplazá el objeto `offer` completo en `src/data/offer.ts`. No cambies el tipo `Offer` ni los comentarios.
5. Corré `npm run lint`.
6. Si el navegador de preview está disponible, abrí la página en `#oferta`, revisá que el cartel se vea bien en mobile (375 px) y en escritorio, y mostrale una captura al usuario.
7. Mostrá un resumen corto (producto, precio, antes, hasta cuándo, condiciones, con o sin foto) y pedí confirmación para publicar.
8. Con el «sí», publicá (ver «Publicar»).

## Quitar la oferta (`/oferta quitar`)

1. Dejá `export const offer: Offer | null = null;` (manteniendo el tipo y los comentarios del archivo).
2. Borrá las fotos de `public/ofertas/` que ya no se usen.
3. Confirmá con el usuario y publicá.

## Foto

- El usuario pasa la **ruta del archivo** en su computadora (por ejemplo `C:\Users\...\Downloads\vacio.jpg`) o la deja directamente en `public/ofertas/`. Una imagen pegada en el chat no se puede guardar como archivo: si la pegan, pedí que la guarden y pasen la ruta.
- Copiála a `public/ofertas/<corte>-<año>-<mes>.<ext>` en minúsculas y sin acentos ni espacios (`vacio-2026-11.jpg`), y poné `image: "/ofertas/vacio-2026-11.jpg"`.
- Borrá la foto de la oferta anterior si ya no se usa (queda en el historial de git).
- Se muestra recortada en 4:3 dentro del cartel: avisá si la foto es muy vertical y el corte podría quedar cortado.

## Publicar

1. Verificá que estás en `main` y traé lo último: `git pull --ff-only`.
2. Hacé commit **sólo** de `src/data/offer.ts` y `public/ofertas/`, con mensaje en español:
   - `Cargar oferta especial: <producto> a $<precio> hasta el <día>`
   - `Quitar oferta especial`
3. `git push`. Vercel publica solo en uno o dos minutos.
4. Avisá al usuario que ya está publicada y que en un par de minutos se ve en la web.
