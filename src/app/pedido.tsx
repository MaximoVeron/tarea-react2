// Redirect de /pedido a /carrito
import { Redirect } from 'expo-router';

export default function PedidoScreen() {
  return <Redirect href="/carrito" />;
}
