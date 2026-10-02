// Tipos y datos de los platos del menu
export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

// Categorias disponibles
export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

// Tipo Plato con todos sus datos
export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

// Lista de platos del comedor
export const platos: Plato[] = [
  // Desayunos
  { id: 1, nombre: 'Mate cocido con leche', precio: 800, descripcion: 'Mate cocido caliente con leche', categoria: 'desayuno' },
  { id: 2, nombre: 'Chipa', precio: 500, descripcion: 'Pan de mandioca tradicional', categoria: 'desayuno' },
  { id: 3, nombre: 'Tortilla cocido', precio: 1200, descripcion: 'Tortilla de harina de mandioca con queso', categoria: 'desayuno' },

  // Almuerzos
  { id: 4, nombre: 'Milanesa con puré', precio: 3500, descripcion: 'Milanesa de ternera con puré de papas', categoria: 'almuerzo' },
  { id: 5, nombre: 'Guiso de mandioca', precio: 2800, descripcion: 'Guiso tradicional paraguayo', categoria: 'almuerzo' },
  { id: 6, nombre: 'Sopa paraguaya', precio: 2200, descripcion: 'Sopa espesa de maíz y queso', categoria: 'almuerzo' },
  { id: 7, nombre: 'Empanadas de carne', precio: 3000, descripcion: 'Empanadas salteñas (3 unidades)', categoria: 'almuerzo' },
  { id: 8, nombre: 'Paiche frito', precio: 4000, descripcion: 'Filete de paiche empanizado y frito', categoria: 'almuerzo' },

  // Bebidas
  { id: 9, nombre: 'Agua mineral', precio: 600, descripcion: 'Agua mineral sin gas 500ml', categoria: 'bebidas' },
  { id: 10, nombre: 'Gaseosa', precio: 800, descripcion: 'Gaseosa nacional 500ml', categoria: 'bebidas' },
  { id: 11, nombre: 'Jugo de frutas', precio: 1000, descripcion: 'Jugo natural de frutas varias', categoria: 'bebidas' },

  // Kiosco
  { id: 12, nombre: 'Alfajor', precio: 700, descripcion: 'Alfajor de chocolate', categoria: 'kiosco' },
  { id: 13, nombre: 'Turrón', precio: 600, descripcion: 'Turrón de maní', categoria: 'kiosco' },
  { id: 14, nombre: 'Caramelos', precio: 400, descripcion: 'Mix de caramelos', categoria: 'kiosco' },
];

// Busca un plato por su id
export function buscarPlatoPorId(id: number): Plato | undefined {
  return platos.find(plato => plato.id === id);
}
