// Parrafo para texto descriptivo
import { Text, StyleSheet } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  children: string;
};

export function Parrafo({ children }: Props) {
  const colores = useColores();

  return (
    <Text style={[styles.parrafo, { color: colores.text }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});
