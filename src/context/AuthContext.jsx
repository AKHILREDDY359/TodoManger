import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({ session: null });

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  // If Supabase is not initialized (missing env vars), render children without auth
  useEffect(() => {
    if (!supabase) return;
    const run = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
    };
    run();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => {
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // Redirect to dashboard when authenticated, away from auth pages
  useEffect(() => {
    if (!session || typeof window === 'undefined') return;
    const path = window.location.pathname;
    if (path === '/login' || path === '/signup' || path === '/') {
      window.history.replaceState(null, '', '/dashboard');
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


