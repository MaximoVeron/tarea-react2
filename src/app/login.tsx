// Pantalla de login para el personal de cocina
// Valida contra usuario y clave fijos (cocina / 1234)
import { Stack, router } from 'expo-router';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { Titulo } from '@/components/Titulo';
import { Boton } from '@/components/Boton';
import { Nota } from '@/components/Nota';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useAuth } from '@/context/auth';
import { useColores } from '@/hooks/use-colores';
import { useState } from 'react';

export default function LoginScreen() {
  const colores = useColores();
  const { iniciarSesion } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  function handleLogin() {
    const ok = iniciarSesion(usuario, clave);
    if (ok) {
      // No navegamos a mano porque Stack.Protected maneja la navegacion
      // Cuando conSesion pasa a true, la pantalla login deja de existir
    } else {
      Alert.alert('Error', 'Usuario o clave incorrectos');
    }
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Iniciar sesion' }} />

      <Titulo>Ingreso al area de cocina</Titulo>

      <Nota>Solo personal autorizado. Use: cocina / 1234</Nota>

      <View style={styles.campo}>
        <Text style={[styles.label, { color: colores.text }]}>Usuario:</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colores.card,
              color: colores.text,
              borderColor: colores.border,
            },
          ]}
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Usuario"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.campo}>
        <Text style={[styles.label, { color: colores.text }]}>Clave:</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colores.card,
              color: colores.text,
              borderColor: colores.border,
            },
          ]}
          value={clave}
          onChangeText={setClave}
          placeholder="Clave"
          placeholderTextColor="#9ca3af"
          secureTextEntry
        />
      </View>

      <Boton onPress={handleLogin}>Ingresar</Boton>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  campo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
