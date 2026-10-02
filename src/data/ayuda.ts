// Artículos de ayuda para los usuarios
export const articulosAyuda: Record<string, { titulo: string; texto: string }> = {
  'horarios': {
    titulo: 'Horarios del comedor',
    texto: 'El comedor atiende de lunes a viernes de 7:00 a 20:00 hs. Los sábados de 8:00 a 14:00 hs.',
  },
  'pagos/efectivo': {
    titulo: 'Pago en efectivo',
    texto: 'Se puede pagar en efectivo en el mostrador del comedor. Los precios están en pesos argentinos.',
  },
  'pagos/tarjeta': {
    titulo: 'Pago con tarjeta',
    texto: 'Aceptamos tarjetas de débito y crédito. El pago se realiza en el mostrador al retirar el pedido.',
  },
  'pedidos/como-pedir': {
    titulo: 'Cómo hacer un pedido',
    texto: '1. Elegí los productos del menú\n2. Agregalos al carrito\n3. Confirmá tu pedido\n4. Retirá con tu número de turno',
  },
};
