// Nota para mensajes importantes
import { Text, StyleSheet, View } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  children: string;
};

export function Nota({ children }: Props) {
  const colores = useColores();

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.card }]}>
      <Text style={[styles.texto, { color: colores.text }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  texto: {
    fontSize: 14,
  },
});
