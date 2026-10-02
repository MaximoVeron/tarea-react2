// Layout del drawer de cocina
// Incluye las pantallas de pedidos pendientes y atendidos
import { Drawer } from 'expo-router/drawer';
import { useColores } from '@/hooks/use-colores';

export default function CocinaLayout() {
  const colores = useColores();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: colores.primary,
        drawerInactiveTintColor: colores.text,
        drawerStyle: {
          backgroundColor: colores.background,
        },
        headerStyle: {
          backgroundColor: colores.background,
        },
        headerTintColor: colores.text,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Pedidos en espera',
          drawerLabel: 'Pendientes',
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Pedidos atendidos',
          drawerLabel: 'Atendidos',
        }}
      />
    </Drawer>
  );
}
