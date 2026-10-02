// Pantalla principal de cocina: muestra el pedido del frente
// Solo se atiende el frente, nadie puede colarse
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Boton } from '@/components/Boton';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/comedor';
import { useAuth } from '@/context/auth';
import { useColores } from '@/hooks/use-colores';

export default function CocinaScreen() {
  const colores = useColores();
  const navigation = useNavigation();
  const { frente, colaPedidos, atenderSiguiente } = useComedor();
  const { cerrarSesion } = useAuth();

  return (
    <Pantalla>
      <Titulo>Area de cocina</Titulo>

      {/* Boton para abrir el drawer */}
      <Pressable
        style={[styles.menuButton, { backgroundColor: colores.card }]}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={[styles.menuButtonText, { color: colores.text }]}>
          Abrir menu
        </Text>
      </Pressable>

      {/* Boton cerrar sesion - solo llama a cerrarSesion, no navega */}
      <Pressable
        style={[styles.cerrarSesion, { backgroundColor: '#ef4444' }]}
        onPress={cerrarSesion}
      >
        <Text style={styles.cerrarSesionText}>Cerrar sesion</Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={[styles.infoTexto, { color: colores.text }]}>
          Pedidos en espera: {colaPedidos.tamanio}
        </Text>
      </View>

      {!frente ? (
        <Nota>No hay pedidos pendientes</Nota>
      ) : (
        <View style={[styles.pedidoCard, { backgroundColor: colores.card }]}>
          <Text style={[styles.pedidoNumero, { color: colores.primary }]}>
            PEDIDO #{frente.numero}
          </Text>

          <FlatList
            data={frente.items}
            keyExtractor={(item) => item.clave.toString()}
            renderItem={({ item }) => (
              <Text style={[styles.itemTexto, { color: colores.text }]}>
                - {item.plato.nombre}
              </Text>
            )}
          />

          {frente.nota ? (
            <View style={styles.notaContainer}>
              <Text style={[styles.notaLabel, { color: colores.text }]}>
                Nota:
              </Text>
              <Text style={[styles.notaTexto, { color: colores.text }]}>
                {frente.nota}
              </Text>
            </View>
          ) : null}

          <Text style={[styles.total, { color: colores.primary }]}>
            Total: ${frente.total}
          </Text>
        </View>
      )}

      {/* Solo se atiende el frente, nadie puede colarse */}
      <Boton onPress={atenderSiguiente} disabled={!frente}>
        Atender siguiente
      </Boton>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 16,
  },
  cerrarSesion: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  cerrarSesionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    marginBottom: 16,
  },
  infoTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
  pedidoCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  pedidoNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  itemTexto: {
    fontSize: 16,
    marginBottom: 4,
  },
  notaContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  notaLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  notaTexto: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 8,
  },
});
