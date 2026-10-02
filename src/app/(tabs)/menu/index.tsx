// Pantalla del menu: muestra todos los platos agrupados por categoria
import { Stack } from 'expo-router';
import { Link } from 'expo-router';
import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Subtitulo } from '@/components/Subtitulo';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { DondeEstoy } from '@/components/DondeEstoy';
import { CATEGORIAS, platos } from '@/data/platos';
import { useColores } from '@/hooks/use-colores';

export default function MenuScreen() {
  const colores = useColores();

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Menu del Comedor' }} />

      <ScrollView>
        {CATEGORIAS.map((categoria) => {
          const platosCategoria = platos.filter((p) => p.categoria === categoria);

          return (
            <View key={categoria} style={styles.seccion}>
              <Subtitulo>{categoria.toUpperCase()}</Subtitulo>

              {platosCategoria.map((plato) => (
                <Link
                  key={plato.id}
                  href={{ pathname: '/menu/[id]', params: { id: plato.id } }}
                  asChild
                >
                  <Pressable>
                    <TarjetaPlato plato={plato} onPress={() => {}} />
                  </Pressable>
                </Link>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  seccion: {
    marginBottom: 24,
  },
});
