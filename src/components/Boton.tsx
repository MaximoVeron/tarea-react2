// Boton simple con estilo primario
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColores } from '@/hooks/use-colores';

type Props = {
  onPress: () => void;
  children: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Boton({ onPress, children, disabled = false, style }: Props) {
  const colores = useColores();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.boton,
        { backgroundColor: disabled ? '#9ca3af' : colores.primary },
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
    >
      <Text style={styles.texto}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
