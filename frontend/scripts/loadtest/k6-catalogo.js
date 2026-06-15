/**
 * Prueba de carga para Ansa Medic Dent (catálogo digital).
 *
 * Simula usuarios navegando: home -> catálogo -> ficha de producto.
 * Requiere k6 (https://k6.io). NO se corre contra localhost ni contra el
 * servidor de desarrollo: apunta a la URL YA DESPLEGADA (CDN incluido).
 *
 * Uso:
 *   BASE_URL=https://ansa-medic.vercel.app k6 run scripts/loadtest/k6-catalogo.js
 *
 * Para simular ~10.000 usuarios simultáneos, ejecutar con el escenario "pico":
 *   BASE_URL=https://ansa-medic.vercel.app k6 run -e ESCENARIO=pico scripts/loadtest/k6-catalogo.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://ansa-medic.vercel.app/';
const ESCENARIO = __ENV.ESCENARIO || 'normal';

const errorRate = new Rate('errores');
const ttfb = new Trend('ttfb_ms', true);

// Algunas rutas de producto reales (ajusta los IDs a los tuyos)
const PRODUCT_IDS = (__ENV.PRODUCT_IDS || '1,2,3').split(',');

const escenarios = {
  // Carga sostenida moderada para validar estabilidad
  normal: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '30s', target: 200 },
      { duration: '1m', target: 200 },
      { duration: '30s', target: 0 },
    ],
  },
  // Pico tipo "campaña": sube hasta 10.000 usuarios virtuales concurrentes
  pico: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '1m', target: 2000 },
      { duration: '2m', target: 10000 },
      { duration: '3m', target: 10000 },
      { duration: '1m', target: 0 },
    ],
  },
};

export const options = {
  scenarios: { [ESCENARIO]: escenarios[ESCENARIO] },
  thresholds: {
    // Objetivos de calidad: 95% de páginas < 800ms y menos de 1% de errores
    http_req_duration: ['p(95)<800'],
    errores: ['rate<0.01'],
  },
};

function visit(path) {
  const res = http.get(`${BASE_URL}${path}`);
  ttfb.add(res.timings.waiting);
  const ok = check(res, {
    'status 200': (r) => r.status === 200,
  });
  errorRate.add(!ok);
  return res;
}

export default function () {
  group('home', () => {
    visit('/');
    sleep(Math.random() * 2 + 1);
  });

  group('catalogo', () => {
    visit('/products');
    sleep(Math.random() * 2 + 1);
  });

  group('ficha_producto', () => {
    const id = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];
    visit(`/products/${id}`);
    sleep(Math.random() * 3 + 1);
  });
}
