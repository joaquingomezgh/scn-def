# Procesa las fotos de cortes: agranda, saca el fondo, mejora color y nitidez, y exporta WebP transparente.
# Es una herramienta de la compu, no parte del sitio. Se instala una vez en un entorno aparte:
#   python -m venv <carpeta-temporal>/venv
#   <carpeta-temporal>/venv/Scripts/python -m pip install "rembg[cpu]" pillow scipy
# Uso (desde la raíz del proyecto), procesando todas o solo las que se nombren, sin extensión:
#   <venv>/Scripts/python -I marketing/procesar-cortes.py marketing/cortes-originales public/ofertas <carpeta-revision> [vacio ...]
# En <carpeta-revision> deja cada recorte sobre fondo verde para revisar bordes y restos de fondo.
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
from rembg import new_session, remove
from scipy import ndimage

src, dst, rev = (Path(p) for p in sys.argv[1:4])
only = set(sys.argv[4:])
dst.mkdir(parents=True, exist_ok=True)
rev.mkdir(parents=True, exist_ok=True)
session = new_session("isnet-general-use")

MAX = 900  # lado mayor final, suficiente para tarjetas de ~300px en pantallas 3x

for f in sorted(src.glob("*.png")) + sorted(src.glob("*.jpg")) + sorted(src.glob("*.jpeg")) + sorted(src.glob("*.webp")):
    if only and f.stem not in only:
        continue
    im = Image.open(f).convert("RGB")
    # Agrandar las chicas antes de recortar, así el borde sale más suave
    scale = max(1, 1200 / max(im.size))
    if scale > 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    cut = remove(im, session=session, post_process_mask=True)
    rgb, a = cut.convert("RGB"), cut.getchannel("A")
    # Color apenas más vivo y un poco de nitidez
    rgb = ImageEnhance.Color(rgb).enhance(1.12)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=2))
    # Suavizar el borde del recorte medio píxel para que no quede serruchado
    a = a.filter(ImageFilter.GaussianBlur(0.6)).point(lambda v: 0 if v < 12 else v)
    # Borrar islas sueltas (granos de pimienta, restos de fondo): quedan solo las piezas grandes
    arr = np.array(a)
    lab, n = ndimage.label(arr > 40)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, sz in enumerate(sizes) if sz >= sizes.max() * 0.02])
        keep = ndimage.binary_dilation(keep, iterations=2)
        arr[~keep] = 0
        a = Image.fromarray(arr)
    out = rgb.copy()
    out.putalpha(a)
    box = a.getbbox()
    out = out.crop(box)
    out.thumbnail((MAX, MAX), Image.LANCZOS)
    out.save(dst / f"{f.stem}.webp", "WEBP", quality=84, method=6)

    # Hoja de revisión: el recorte sobre un fondo de color para ver bordes y restos de fondo
    prev = Image.new("RGBA", (out.width + 40, out.height + 40), (60, 140, 90, 255))
    prev.alpha_composite(out, (20, 20))
    ImageDraw.Draw(prev).text((6, 4), f.stem, fill="white")
    prev.convert("RGB").save(rev / f"{f.stem}.jpg", quality=80)
    print(f.stem, out.size, round((dst / f'{f.stem}.webp').stat().st_size / 1024), "KB")
