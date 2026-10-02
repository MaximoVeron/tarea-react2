// Contexto de autenticacion
// Gestiona si el usuario esta logueado como cocinero
import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Usuario y clave para el area de cocina
const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = '1234';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);

  // Valida el usuario y clave
  // Devuelve true si es correcto, false si no
  function iniciarSesion(user: string, clave: string): boolean {
    if (user === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setUsuario(user);
      return true;
    }
    return false;
  }

  // Cierra la sesion
  function cerrarSesion() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticacion
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
