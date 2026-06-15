import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { createClient } from '../lib/supabase/client';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/** Convierte el usuario de Supabase al formato simple de la app */
function mapUser(supabaseUser: SupabaseUser | undefined | null): User | null {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name:
      (supabaseUser.user_metadata?.name as string) ||
      supabaseUser.email?.split('@')[0] ||
      'Admin',
    role: (supabaseUser.user_metadata?.role as string) || 'admin',
  };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [supabase] = useState(() => createClient());
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    const applySession = (session: Session | null) => {
      if (!mounted) return;
      const user = mapUser(session?.user);
      setAuthState({ user, isAuthenticated: !!user, isLoading: false });
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return { ok: false, error: traducirError(error.message) };
      }

      setAuthState({
        user: mapUser(data.user),
        isAuthenticated: true,
        isLoading: false,
      });
      return { ok: true };
    },
    [supabase]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  }, [supabase]);

  const value: AuthContextType = { ...authState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Mensajes de error de Supabase a español */
function traducirError(message: string): string {
  if (/invalid login credentials/i.test(message)) {
    return 'Correo o contraseña incorrectos.';
  }
  if (/email not confirmed/i.test(message)) {
    return 'El correo no ha sido confirmado.';
  }
  if (/rate limit/i.test(message)) {
    return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  }
  return 'No se pudo iniciar sesión. Inténtalo de nuevo.';
}

export default AuthContext;
