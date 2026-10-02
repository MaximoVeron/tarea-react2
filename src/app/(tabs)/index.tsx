// Pantalla de inicio: muestra el menu principal de la app
// Liga a las distintas secciones y permite acceso a cocina si hay sesion
import { Stack } from 'expo-router';
import { Link } from 'expo-router';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { TarjetaEjemplo } from '@/components/TarjetaEjemplo';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useAuth } from '@/context/auth';
import { CATEGORIAS } from '@/data/platos';

export default function InicioScreen() {
  const { usuario } = useAuth();

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Comedor IPF' }} />

      <Titulo>Bienvenido al Comedor IPF</Titulo>

      <View style={styles.links}>
        <Link href="/menu" asChild>
          <Pressable style={styles.boton}>
            {({ pressed }) => (
              <Text style={styles.botonTexto}>Ver Menu</Text>
            )}
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={styles.boton}>
            {({ pressed }) => (
              <Text style={styles.botonTexto}>Buscar</Text>
            )}
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={styles.boton}>
            {({ pressed }) => (
              <Text style={styles.botonTexto}>Ayuda</Text>
            )}
          </Pressable>
        </Link>

        {usuario ? (
          <Link href="/cocina" asChild>
            <Pressable style={styles.boton}>
              {({ pressed }) => (
                <Text style={styles.botonTexto}>Cocina</Text>
              )}
            </Pressable>
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Pressable style={styles.boton}>
              {({ pressed }) => (
                <Text style={styles.botonTexto}>Iniciar sesion (Cocina)</Text>
              )}
            </Pressable>
          </Link>
        )}
      </View>

      <View style={styles.categorias}>
        <Text style={styles.categoriasTitulo}>Categorias:</Text>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat}
            href={{ pathname: '/categorias/[categoria]', params: { categoria: cat } }}
            asChild
          >
            <Pressable style={styles.categoriaLink}>
              <Text style={styles.categoriaTexto}>{cat}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  links: {
    gap: 12,
    marginBottom: 24,
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  categorias: {
    marginTop: 16,
  },
  categoriasTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriaLink: {
    padding: 8,
  },
  categoriaTexto: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
