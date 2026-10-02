// Informacion de debug para mostrar la ruta actual
// Poner DEBUG = false para ocultar en produccion
import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';
import { useColores } from '@/hooks/use-colores';

const DEBUG = true;

export function DondeEstoy() {
  const colores = useColores();

  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.card }]}>
      <Text style={[styles.texto, { color: colores.text }]}>
        Ruta: {pathname}
      </Text>
      <Text style={[styles.texto, { color: colores.text }]}>
        Segmentos: {JSON.stringify(segments)}
      </Text>
      <Text style={[styles.texto, { color: colores.text }]}>
        Params: {JSON.stringify(params)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
  },
  texto: {
    fontSize: 10,
    fontFamily: 'monospace',
  },
});
