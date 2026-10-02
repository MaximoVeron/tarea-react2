// Stack del carrito: permite navegar al detalle de nota
import { Stack } from 'expo-router';

export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      <Stack.Screen
        name="nota"
        options={{
          title: 'Agregar nota',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.9],
        }}
      />
    </Stack>
  );
}
