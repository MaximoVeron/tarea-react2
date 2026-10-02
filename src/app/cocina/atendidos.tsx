// Pantalla de pedidos atendidos (del drawer de cocina)
// Muestra la pila de atendidos del tope a la base
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function AtendidosScreen() {
  const colores = useColores();
  const { pilaAtendidos } = useComedor();

  // Mostramos del tope a la base usando reverse
  const atendidos = [...pilaAtendidos.aArray()].reverse();

  return (
    <Pantalla>
      <Titulo>Pedidos atendidos</Titulo>

      {atendidos.length === 0 ? (
        <Nota>No hay pedidos atendidos</Nota>
      ) : (
        <FlatList
          data={atendidos}
          keyExtractor={(item) => item.numero.toString()}
          renderItem={({ item }) => (
            <View style={[styles.pedidoCard, { backgroundColor: colores.card }]}>
              <Text style={[styles.pedidoNumero, { color: colores.primary }]}>
                #{item.numero}
              </Text>
              <Text style={[styles.itemCount, { color: colores.text }]}>
                {item.items.length} item(s)
              </Text>
              <Text style={[styles.total, { color: colores.primary }]}>
                ${item.total}
              </Text>
            </View>
          )}
        />
      )}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  pedidoCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pedidoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
  },
});
