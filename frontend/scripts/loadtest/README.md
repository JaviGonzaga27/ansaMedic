# Pruebas de carga — Ansa Medic Dent

## Por qué así
El catálogo está construido como páginas **estáticas + ISR**, servidas desde el
CDN del hosting (Vercel/Cloudflare). Para 10.000 usuarios simultáneos, lo que
responde es el **CDN**, no el servidor de origen ni Supabase. Por eso la prueba
debe apuntar a la **URL desplegada**, no a `localhost` ni a `next dev`.

## Requisitos
- Instalar k6: https://k6.io/docs/get-started/installation/
- Tener el sitio desplegado y su URL pública.

## Correr
```bash
# Prueba de estabilidad (200 usuarios)
BASE_URL=https://TU-DOMINIO k6 run scripts/loadtest/k6-catalogo.js
BASE_URL=https://TU-DOMINIO k6 run scripts/loadtest/k6-catalogo.js

# Pico hasta 10.000 usuarios virtuales concurrentes
BASE_URL=https://TU-DOMINIO ESCENARIO=pico \
  PRODUCT_IDS=ID1,ID2,ID3 k6 run scripts/loadtest/k6-catalogo.js
```

## Qué mirar en el reporte
- `http_req_duration p(95)`: objetivo < 800 ms.
- `errores`: objetivo < 1%.
- `http_reqs`: peticiones/seg que soportó.

## Notas para que aguante 10k
1. Hospeda en Vercel o Cloudflare Pages (CDN global) — sin esto el origen es el cuello de botella.
2. Las páginas `/`, `/products` y `/products/[id]` deben salir como estáticas/ISR
   en el `next build` (símbolos ● o ○, no ƒ). Verifícalo con `npm run build`.
3. Evita que el catálogo consulte Supabase en cada visita (ya resuelto con ISR).
4. Si usas Supabase en el plan free, vigila el límite de egress; el catálogo ya
   no lo golpea por visita gracias al ISR.
