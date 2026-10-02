// Pantalla de categoria: muestra platos de una categoria especifica
// Valida que la categoria sea valida contra CATEGORIAS
import { Stack, useLocalSearchParams, router, Link } from 'expo-router';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { CATEGORIAS, platos } from '@/data/platos';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // Validamos que la categoria sea una de las validas
  const esValida = CATEGORIAS.includes(categoria as any);

  if (!esValida) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Categoria no valida' }} />
        <Titulo>Categoria no encontrada</Titulo>
        <Nota>Las categorias disponibles son:</Nota>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat}
            href={{ pathname: '/categorias/[categoria]', params: { categoria: cat } }}
            asChild
          >
            <Pressable style={styles.linkCategoria}>
              <Text style={styles.linkTexto}>{cat}</Text>
            </Pressable>
          </Link>
        ))}
        <DondeEstoy />
      </Pantalla>
    );
  }

  const platosCategoria = platos.filter((p) => p.categoria === categoria);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: categoria?.toUpperCase() || '' }} />

      <Titulo>{categoria?.toUpperCase()}</Titulo>

      <FlatList
        data={platosCategoria}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/menu/[id]', params: { id: item.id } }}
            asChild
          >
            <Pressable>
              <TarjetaPlato plato={item} onPress={() => {}} />
            </Pressable>
          </Link>
        )}
      />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  linkCategoria: {
    padding: 8,
  },
  linkTexto: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
