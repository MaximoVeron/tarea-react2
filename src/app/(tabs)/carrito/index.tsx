// Pantalla del carrito: muestra items, total y acciones
import { Stack, Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Boton } from '@/components/Boton';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function CarritoScreen() {
  const colores = useColores();
  const { carrito, total, nota, puedeDeshacer, cantidadItems, deshacerUltimo } = useComedor();

  if (carrito.length === 0) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Carrito' }} />
        <Titulo>Carrito vacio</Titulo>
        <Nota>No hay productos en el carrito</Nota>
        <Link href="/menu" asChild>
          <Boton onPress={() => {}}>Ver menu</Boton>
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Tu pedido' }} />

      <Titulo>Carrito</Titulo>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.clave.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colores.card }]}>
            <Text style={[styles.itemNombre, { color: colores.text }]}>
              {item.plato.nombre}
            </Text>
            <Text style={[styles.itemPrecio, { color: colores.primary }]}>
              ${item.plato.precio}
            </Text>
          </View>
        )}
        style={styles.lista}
      />

      {nota ? (
        <View style={styles.notaContainer}>
          <Text style={[styles.notaLabel, { color: colores.text }]}>Nota:</Text>
          <Text style={[styles.notaTexto, { color: colores.text }]}>{nota}</Text>
        </View>
      ) : null}

      <View style={styles.totalContainer}>
        <Text style={[styles.totalLabel, { color: colores.text }]}>Total:</Text>
        <Text style={[styles.totalPrecio, { color: colores.primary }]}>${total}</Text>
      </View>

      <View style={styles.acciones}>
        <Boton onPress={deshacerUltimo} disabled={!puedeDeshacer}>
          Deshacer ultimo
        </Boton>

        <Link href="/carrito/nota" asChild>
          <Boton onPress={() => {}}>Agregar nota</Boton>
        </Link>

        <Link href="/confirmar" asChild>
          <Boton onPress={() => {}}>Confirmar pedido</Boton>
        </Link>
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemNombre: {
    fontSize: 16,
  },
  itemPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notaContainer: {
    marginTop: 8,
  },
  notaLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  notaTexto: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  totalPrecio: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  acciones: {
    gap: 12,
    marginTop: 24,
  },
});
