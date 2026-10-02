// Layout raiz: configuran la navegacion principal de la app
// Incluye GestureHandlerRootView, providers de auth y comedor, y el stack principal
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '@/context/auth';
import { ComedorProvider } from '@/context/comedor';

// Configuracion para que (tabs) sea el anchor
// Un deep link a /categorias/bebidas deja las pestañas debajo en la pila
export const unstable_settings = {
  anchor: '(tabs)',
};

function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;

  return (
    <Stack>
      {/* Pantallas con headerShown false van las tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rutas publicas con titulo */}
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ title: 'Categoria' }}
      />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Ayuda' }} />

      {/* Modal de confirmacion */}
      <Stack.Screen
        name="confirmar"
        options={{ presentation: 'modal', title: 'Confirmar pedido' }}
      />

      {/* Ruta protegida: cocina solo con sesion */}
      {/* Cuando el guard pasa a false, la pantalla deja de existir y sale de la pila sola */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Ruta protegida: login solo sin sesion */}
      {/* Por eso el login se cierra sin router.back() al iniciar sesion */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{ presentation: 'modal', title: 'Iniciar sesion' }}
        />
      </Stack.Protected>

      {/* Redirect de /pedido a /carrito */}
      <Stack.Screen name="pedido" options={{ headerShown: false }} />

      {/* 404 */}
      <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Providers de contexto: auth primero, luego comedor */}
      <AuthProvider>
        <ComedorProvider>
          <NavegacionRaiz />
        </ComedorProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
