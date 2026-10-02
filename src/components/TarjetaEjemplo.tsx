// Tarjeta para mostrar informacion en un recuadro
import { Pressable, Text, StyleSheet, ViewStyle, View } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  titulo: string;
  descripcion?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function TarjetaEjemplo({ titulo, descripcion, onPress, style }: Props) {
  const colores = useColores();

  const contenido = (
    <>
      <Text style={[styles.titulo, { color: colores.text }]}>{titulo}</Text>
      {descripcion && (
        <Text style={[styles.descripcion, { color: colores.text }]}>
          {descripcion}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.tarjeta,
          { backgroundColor: colores.card },
          pressed && { opacity: 0.7 },
          style,
        ]}
      >
        {contenido}
      </Pressable>
    );
  }

  return (
    <View style={[styles.tarjeta, { backgroundColor: colores.card }, style]}>
      {contenido}
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 14,
    marginTop: 4,
  },
});
