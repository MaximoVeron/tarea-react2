// Pantalla de busqueda: filtra platos por nombre y categoria
// Los parametros q y categoria se mantienen en la URL para compartir
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { View, TextInput, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { DondeEstoy } from '@/components/DondeEstoy';
import { CATEGORIAS, platos } from '@/data/platos';
import { useColores } from '@/hooks/use-colores';

export default function BuscarScreen() {
  const colores = useColores();
  const { q = '', categoria = '' } = useLocalSearchParams<{
    q: string;
    categoria: string;
  }>();

  // Filtramos los platos
  let platosFiltrados = platos;

  // Filtrar por texto en nombre
  if (q) {
    const texto = q.toLowerCase();
    platosFiltrados = platosFiltrados.filter((p) =>
      p.nombre.toLowerCase().includes(texto)
    );
  }

  // Filtrar por categoria
  if (categoria) {
    platosFiltrados = platosFiltrados.filter((p) => p.categoria === categoria);
  }

  // setParams no apila una pantalla por letra y deja la busqueda en la URL para compartirla
  function handleTextoChange(texto: string) {
    router.setParams({ q: texto });
  }

  function handleCategoriaClick(cat: string) {
    if (categoria === cat) {
      router.setParams({ categoria: '' });
    } else {
      router.setParams({ categoria: cat });
    }
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Buscar' }} />

      <Titulo>Buscar platos</Titulo>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colores.card,
            color: colores.text,
            borderColor: colores.border,
          },
        ]}
        value={q}
        onChangeText={handleTextoChange}
        placeholder="Buscar por nombre..."
        placeholderTextColor="#9ca3af"
      />

      <View style={styles.categoriasFiltro}>
        <Pressable
          style={[
            styles.categoriaChip,
            {
              backgroundColor: !categoria ? colores.primary : colores.card,
            },
          ]}
          onPress={() => handleCategoriaClick('')}
        >
          <Text
            style={[
              styles.categoriaChipTexto,
              { color: !categoria ? '#fff' : colores.text },
            ]}
          >
            Todas
          </Text>
        </Pressable>

        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.categoriaChip,
              {
                backgroundColor:
                  categoria === cat ? colores.primary : colores.card,
              },
            ]}
            onPress={() => handleCategoriaClick(cat)}
          >
            <Text
              style={[
                styles.categoriaChipTexto,
                { color: categoria === cat ? '#fff' : colores.text },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={platosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TarjetaPlato
            plato={item}
            onPress={() =>
              router.push({ pathname: '/menu/[id]', params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.sinResultados, { color: colores.text }]}>
            No se encontraron platos
          </Text>
        }
      />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  categoriasFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoriaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoriaChipTexto: {
    fontSize: 14,
  },
  sinResultados: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
