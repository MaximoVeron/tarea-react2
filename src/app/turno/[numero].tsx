// Pantalla que muestra el numero de turno asignado
// Calcula la posicion en la cola y el tiempo estimado
import { Stack, useLocalSearchParams, router, Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Parrafo } from '@/components/Parrafo';
import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function TurnoScreen() {
  const colores = useColores();
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { posicionEnCola } = useComedor();

  const num = Number(numero);

  // La posicion -1 significa que ya fue atendido
  // Si es mayor que ultimoNumero, el pedido no existe
  const posicion = posicionEnCola(num);

  if (posicion === -1) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Turno' }} />
        <Titulo>{'Pedido #' + num}</Titulo>
        <Parrafo>Tu pedido ya fue atendido. Gracias por tu visita!</Parrafo>
        <Link href="/" asChild>
          <Boton onPress={() => router.replace('/')}>Volver al inicio</Boton>
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  // Tiempo estimado: posicion * 3 minutos
  const tiempoEstimado = posicion * 3;

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Tu turno' }} />

      <Titulo>Tu turno</Titulo>

      <View style={styles.turnoGrande}>
        <Text style={[styles.numeroTurno, { color: colores.primary }]}>
          #{num}
        </Text>
      </View>

      <Parrafo>
        {posicion === 0
          ? 'Sos el siguiente! Espere su turno.'
          : `Tenes ${posicion} pedido(s) adelante.`}
      </Parrafo>

      <View style={[styles.info, { backgroundColor: colores.card }]}>
        <Text style={[styles.infoTexto, { color: colores.text }]}>
          Tiempo estimado de espera: {tiempoEstimado} minutos
        </Text>
      </View>

      <Parrafo>
        Te avisaremos cuando este listo. Recorda tu numero de turno.
      </Parrafo>

      <Link href="/" asChild>
        <Boton onPress={() => {}}>Volver al inicio</Boton>
      </Link>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  turnoGrande: {
    alignItems: 'center',
    marginVertical: 32,
  },
  numeroTurno: {
    fontSize: 96,
    fontWeight: 'bold',
  },
  info: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  infoTexto: {
    fontSize: 16,
    textAlign: 'center',
  },
});
