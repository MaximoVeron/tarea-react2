// Hook para obtener los colores del tema segun el modo claro/oscuro
import { useColorScheme } from 'react-native';
import { theme } from '@/constants/theme';

export function useColores() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? theme.dark : theme.light;
}
