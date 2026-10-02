// Titulo grande para pantallas
import { Text, StyleSheet } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  children: string;
};

export function Titulo({ children }: Props) {
  const colores = useColores();

  return (
    <Text style={[styles.titulo, { color: colores.text }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
