// Pantalla 404: se muestra cuando la ruta no existe
// Muestra la URL pedida con usePathname
import { Link, usePathname } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Boton } from '@/components/Boton';
import { useColores } from '@/hooks/use-colores';

export default function NotFoundScreen() {
  const colores = useColores();
  const pathname = usePathname();

  return (
    <Pantalla>
      <Titulo>Pagina no encontrada</Titulo>

      <View style={[styles.info, { backgroundColor: colores.card }]}>
        <Text style={[styles.label, { color: colores.text }]}>
          La ruta solicitada:
        </Text>
        <Text style={[styles.pathname, { color: colores.primary }]}>
          {pathname}
        </Text>
      </View>

      <Text style={[styles.mensaje, { color: colores.text }]}>
        Esta pagina no existe en la app.
      </Text>

      <Link href="/" asChild>
        <Boton onPress={() => {}}>Ir al inicio</Boton>
      </Link>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  info: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  pathname: {
    fontSize: 18,
    fontFamily: 'monospace',
  },
  mensaje: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
});
