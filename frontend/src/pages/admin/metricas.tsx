import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaSpinner, FaSignOutAlt, FaEye, FaWhatsapp, FaFileInvoice,
  FaArrowLeft, FaChartLine,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getMetrics, MetricsData, TopItem } from '../../services/metrics.service';

const PERIODOS = [
  { label: '7 días', dias: 7 },
  { label: '30 días', dias: 30 },
  { label: '90 días', dias: 90 },
];

const MetricasPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const [dias, setDias] = useState(30);
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/admin/login');
  }, [isLoading, isAuthenticated, router]);

  const load = useCallback(async (d: number) => {
    setLoading(true);
    setError(null);
    try {
      setData(await getMetrics(d));
    } catch (e: any) {
      setError(
        /relation .* does not exist|eventos/i.test(String(e?.message))
          ? 'Aún no existe la tabla de métricas. Ejecuta el script scripts/supabase-metricas.sql en Supabase.'
          : e?.message || 'No se pudieron cargar las métricas.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) load(dias);
  }, [isAuthenticated, dias, load]);

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <FaSpinner className="text-3xl text-teal-600 animate-spin" />
      </div>
    );
  }

  const kpis = data
    ? [
        { icon: FaEye, label: 'Vistas de productos', value: data.vistas, tint: 'bg-teal-50 text-teal-700' },
        { icon: FaWhatsapp, label: 'Consultas por WhatsApp', value: data.whatsapp, tint: 'bg-green-50 text-green-700' },
        { icon: FaFileInvoice, label: 'Productos cotizados', value: data.cotizaciones, tint: 'bg-amber-50 text-amber-700' },
      ]
    : [];

  const TopList = ({ title, icon, items }: { title: string; icon: React.ReactNode; items: TopItem[] }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">{icon} {title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">Sin datos en este periodo.</p>
      ) : (
        <ol className="space-y-2">
          {items.map((it, i) => (
            <li key={it.producto_id} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span className="flex-1 text-sm text-slate-700 truncate">{it.producto_nombre || it.producto_id}</span>
              <span className="text-sm font-bold text-slate-900">{it.total}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Métricas | Ansa Medic Dent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Ansa Medic Dent" width={132} height={48} className="h-8 w-auto" quality={90} />
              <span className="hidden sm:block h-6 w-px bg-slate-200" />
              <span className="hidden sm:block text-sm font-semibold text-slate-700">Métricas</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                <FaArrowLeft /> <span className="hidden sm:inline">Productos</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                <FaSignOutAlt /> <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FaChartLine className="text-teal-600" /> Métricas del catálogo
              </h1>
              <p className="text-sm text-slate-500">Qué buscan y consultan tus clientes · {user?.email}</p>
            </div>
            <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 self-start">
              {PERIODOS.map((p) => (
                <button
                  key={p.dias}
                  onClick={() => setDias(p.dias)}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${dias === p.dias ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-24"><FaSpinner className="text-3xl text-teal-600 animate-spin" /></div>
          ) : data ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                {kpis.map((k) => (
                  <div key={k.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${k.tint}`}>
                      <k.icon className="text-lg" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900 leading-none">{k.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{k.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopList title="Productos más vistos" icon={<FaEye className="text-teal-600" />} items={data.topVistas} />
                <TopList title="Más consultados por WhatsApp" icon={<FaWhatsapp className="text-green-600" />} items={data.topWhatsapp} />
              </div>

              <p className="text-xs text-slate-400 mt-6">
                Los datos se registran de forma anónima (sin información personal del visitante).
              </p>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default MetricasPage;
