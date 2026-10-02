// Pantalla de confirmacion del pedido
// Usa replace en vez de push para que atras no vuelva a confirmar el mismo pedido
import { Stack, router } from 'expo-router';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function ConfirmarScreen() {
  const colores = useColores();
  const { carrito, total, nota, confirmarPedido } = useComedor();

  if (carrito.length === 0) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Carrito vacio' }} />
        <Titulo>No hay nada para confirmar</Titulo>
        <Boton onPress={() => router.back()}>Volver al carrito</Boton>
        <DondeEstoy />
      </Pantalla>
    );
  }

  function handleConfirmar() {
    // Encolamos el pedido y obtenemos el numero
    const numero = confirmarPedido();

    // Replace saca la confirmacion de la pila
    // Asi atras no vuelve a confirmar el mismo pedido
    // (con push quedaria debajo y se podria confirmar dos veces)
    router.replace({
      pathname: '/turno/[numero]',
      params: { numero },
    });
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Confirmar pedido' }} />

      <Titulo>Resumen de tu pedido</Titulo>

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
        <View style={[styles.nota, { backgroundColor: colores.card }]}>
          <Text style={[styles.notaLabel, { color: colores.text }]}>Nota:</Text>
          <Text style={[styles.notaTexto, { color: colores.text }]}>{nota}</Text>
        </View>
      ) : null}

      <View style={styles.totalContainer}>
        <Text style={[styles.totalLabel, { color: colores.text }]}>
          Total a pagar:
        </Text>
        <Text style={[styles.totalPrecio, { color: colores.primary }]}>
          ${total}
        </Text>
      </View>

      <View style={styles.acciones}>
        <Boton onPress={handleConfirmar}>Confirmar pedido</Boton>
        <Boton onPress={() => router.back()}>Cancelar</Boton>
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
    padding: 12,
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
  nota: {
    padding: 12,
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrecio: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  acciones: {
    gap: 12,
    marginTop: 24,
  },
});
