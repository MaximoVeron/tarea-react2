// Pantalla de detalle de un plato
// El parametro id llega como string, se convierte a number para buscar
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Parrafo } from '@/components/Parrafo';
import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { buscarPlatoPorId } from '@/data/platos';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function DetallePlatoScreen() {
  const colores = useColores();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();

  // El parametro siempre llega como texto
  // Es el error comun de comparar con un numero sin convertir
  const platoEncontrado = buscarPlatoPorId(Number(id));

  if (!platoEncontrado) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={[styles.noEncontrado, { color: colores.text }]}>
          Plato no encontrado
        </Text>
      </Pantalla>
    );
  }

  function handleAgregar() {
    agregarAlCarrito(platoEncontrado!);
    Alert.alert('Agregado', `${platoEncontrado!.nombre} se agrego al carrito`);
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: platoEncontrado!.nombre }} />

      <Titulo>{platoEncontrado.nombre}</Titulo>

      <Text style={[styles.precio, { color: colores.primary }]}>
        ${platoEncontrado.precio}
      </Text>

      <View style={[styles.categoriaBadge, { backgroundColor: colores.card }]}>
        <Text style={[styles.categoriaTexto, { color: colores.text }]}>
          {platoEncontrado.categoria}
        </Text>
      </View>

      <Parrafo>{platoEncontrado.descripcion}</Parrafo>

      <View style={styles.botonContainer}>
        <Boton onPress={handleAgregar}>Agregar al carrito</Boton>
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  precio: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  categoriaBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  categoriaTexto: {
    textTransform: 'capitalize',
    fontSize: 14,
  },
  botonContainer: {
    marginTop: 24,
  },
  noEncontrado: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
