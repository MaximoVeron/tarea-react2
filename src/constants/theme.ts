// Tema de colores para la app (claro y oscuro)
export const theme = {
  light: {
    primary: '#2563eb',
    background: '#ffffff',
    card: '#f3f4f6',
    text: '#111827',
    border: '#e5e7eb',
    notification: '#ef4444',
  },
  dark: {
    primary: '#3b82f6',
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
    notification: '#ef4444',
  },
};

export type Theme = typeof theme.light;
