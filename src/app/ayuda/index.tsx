// Indice de ayuda: lista todos los articulos disponibles
import { Stack, Link } from 'expo-router';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { DondeEstoy } from '@/components/DondeEstoy';
import { articulosAyuda } from '@/data/ayuda';
import { useColores } from '@/hooks/use-colores';

export default function AyudaIndexScreen() {
  const colores = useColores();

  // Obtenemos las claves de los articulos
  const claves = Object.keys(articulosAyuda);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Ayuda' }} />

      <Titulo>Centro de ayuda</Titulo>

      <FlatList
        data={claves}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/ayuda/[...slug]', params: { slug: item.split('/') } }}
            asChild
          >
            <Pressable
              style={[styles.articuloLink, { backgroundColor: colores.card }]}
            >
              <Text style={[styles.articuloTitulo, { color: colores.text }]}>
                {articulosAyuda[item].titulo}
              </Text>
              <Text style={[styles.articuloFlecha, { color: colores.primary }]}>
                {'>'}
              </Text>
            </Pressable>
          </Link>
        )}
      />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  articuloLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  articuloTitulo: {
    fontSize: 16,
  },
  articuloFlecha: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
