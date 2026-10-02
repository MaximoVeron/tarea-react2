// Subtitulo para secciones
import { Text, StyleSheet } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  children: string;
};

export function Subtitulo({ children }: Props) {
  const colores = useColores();

  return (
    <Text style={[styles.subtitulo, { color: colores.text }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
});
