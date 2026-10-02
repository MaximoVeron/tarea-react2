// Pantalla para agregar una nota al pedido
import { Stack, router } from 'expo-router';
import { View, TextInput, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Boton } from '@/components/Boton';
import { useComedor } from '@/context/comedor';
import { useColores } from '@/hooks/use-colores';

export default function NotaScreen() {
  const colores = useColores();
  const { nota, setNota } = useComedor();

  function handleGuardar() {
    router.back();
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Nota para el pedido' }} />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colores.card,
            color: colores.text,
            borderColor: colores.border,
          },
        ]}
        value={nota}
        onChangeText={setNota}
        placeholder="Ej: Sin cebolla, extra salsa..."
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={4}
      />

      <Boton onPress={handleGuardar}>Guardar</Boton>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
});
