import { createBrowserClient } from '@supabase/ssr';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          id: string;
          categoria: string;
          nombre_producto: string;
          descripcion: string;
          imagen_principal: string;
          imagenes_adicionales: string[] | null;
          caracteristicas: Json | null;
          especificaciones: Json | null;
          destacado: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          categoria: string;
          nombre_producto: string;
          descripcion: string;
          imagen_principal: string;
          imagenes_adicionales?: string[] | null;
          caracteristicas?: Json | null;
          especificaciones?: Json | null;
          destacado?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          categoria?: string;
          nombre_producto?: string;
          descripcion?: string;
          imagen_principal?: string;
          imagenes_adicionales?: string[] | null;
          caracteristicas?: Json | null;
          especificaciones?: Json | null;
          destacado?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Instancia única (singleton) compartida en toda la app, para que la sesión
// iniciada en AuthContext viaje también en las peticiones de admin.service.
let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return browserClient;
}
