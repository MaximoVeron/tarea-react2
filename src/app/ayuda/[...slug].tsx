// Pantalla de articulo de ayuda individual
// El slug es un array que joined con / forma la clave
import { Stack, useLocalSearchParams, router, Link } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Parrafo } from '@/components/Parrafo';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { articulosAyuda } from '@/data/ayuda';

export default function AyudaSlugScreen() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  // Unimos los segmentos con / para formar la clave
  const clave = slug ? slug.join('/') : '';
  const articulo = articulosAyuda[clave];

  if (!articulo) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Articulo no encontrado' }} />
        <Titulo>Articulo no encontrado</Titulo>
        <Nota>Este tema de ayuda no existe.</Nota>
        <Link href="/ayuda" asChild>
          <Parrafo>Volver al indice de ayuda</Parrafo>
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: articulo.titulo }} />

      <Titulo>{articulo.titulo}</Titulo>

      <Text style={styles.texto}>{articulo.texto}</Text>

      <Link href="/ayuda" asChild>
        <Parrafo>Volver al indice</Parrafo>
      </Link>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
