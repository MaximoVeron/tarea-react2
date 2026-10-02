// Tarjeta para mostrar un plato en el menu
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useColores } from '@/hooks/use-colores';
import { Plato } from '@/data/platos';

type Props = {
  plato: Plato;
  onPress: () => void;
};

export function TarjetaPlato({ plato, onPress }: Props) {
  const colores = useColores();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tarjeta,
        { backgroundColor: colores.card },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.nombre, { color: colores.text }]}>{plato.nombre}</Text>
      <Text style={[styles.precio, { color: colores.primary }]}>${plato.precio}</Text>
      <Text style={[styles.descripcion, { color: colores.text }]} numberOfLines={2}>
        {plato.descripcion}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  descripcion: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
});
