// Layout de tabs: define las pestañas de navegacion inferior
// Usa Tabs de expo-router/js-tabs con iconos
import { Tabs } from 'expo-router';
import { useColores } from '@/hooks/use-colores';
import { useComedor } from '@/context/comedor';

export default function TabsLayout() {
  const colores = useColores();
  const { cantidadItems } = useComedor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colores.primary,
        tabBarInactiveTintColor: colores.text,
        tabBarStyle: {
          backgroundColor: colores.background,
          borderTopColor: colores.border,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colores.background,
        },
        headerTintColor: colores.text,
      }}
    >
      {/* Pestaña Inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* Pestaña Menu */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="restaurant" color={color} />,
        }}
      />

      {/* Pestaña Carrito con badge */}
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
          tabBarBadge: cantidadItems > 0 ? cantidadItems : undefined,
        }}
      />
    </Tabs>
  );
}

// Componente para iconos de la barra de tabs
import { Ionicons } from '@expo/vector-icons';

type IconName = 'home' | 'restaurant' | 'cart';

function TabBarIcon({ name, color }: { name: IconName; color: string }) {
  const iconMap: Record<IconName, keyof typeof Ionicons.glyphMap> = {
    home: 'home',
    restaurant: 'restaurant',
    cart: 'cart',
  };
  return <Ionicons size={24} name={iconMap[name]} color={color} />;
}
