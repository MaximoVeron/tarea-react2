// Componente base para envolver pantallas
// Proporciona el fondo de la app y el padding
import { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Pantalla({ children, style }: Props) {
  const colores = useColores();

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.background }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
});
