// Contexto del comedor
// Gestiona el carrito, pila de deshacer, cola de pedidos y pila de atendidos
import { createContext, useContext, useState, ReactNode } from 'react';
import { Pila } from '@/estructuras/Pila';
import { Cola } from '@/estructuras/Cola';
import { Plato } from '@/data/platos';

// Item del carrito con clave unica
type ItemCarrito = {
  clave: number;
  plato: Plato;
};

// Pedido en la cola
type Pedido = {
  numero: number;
  items: ItemCarrito[];
  total: number;
  nota: string;
};

type ComedorContextType = {
  carrito: ItemCarrito[];
  nota: string;
  pilaAtendidos: Pila<Pedido>;
  colaPedidos: Cola<Pedido>;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;
  total: number;
  cantidadItems: number;
  setNota: (texto: string) => void;
  confirmarPedido: () => number;
  atenderSiguiente: () => void;
  posicionEnCola: (numero: number) => number;
  frente: Pedido | undefined;
};

const ComedorContext = createContext<ComedorContextType | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  // Instancias de las estructuras de datos
  // Se crean una sola vez con useState para que persistan
  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [pilaAtendidos] = useState(() => new Pila<Pedido>());

  // Estado del carrito y nota
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [ultimoNumero, setUltimoNumero] = useState(0);

  // Pila para deshacer: guarda las claves de items agregados
  const [pilaDeshacer, setPilaDeshacer] = useState(() => new Pila<number>());

  // Version para forzar re-render cuando las clases cambian
  // Las clases se modifican por dentro y React no lo detecta solo
  // Por eso forzamos un nuevo render con setVersion
  const [version, setVersion] = useState(0);
  function refrezcar() {
    setVersion(v => v + 1);
  }

  // Agrega un plato al carrito
  function agregarAlCarrito(plato: Plato) {
    const clave = Date.now(); // Clave unica basada en tiempo
    const nuevoItem: ItemCarrito = { clave, plato };

    setCarrito(prev => [...prev, nuevoItem]);

    // Guardamos la clave en la pila de deshacer
    const nuevaPila = new Pila<number>();
    pilaDeshacer.aArray().forEach(c => nuevaPila.push(c));
    nuevaPila.push(clave);
    setPilaDeshacer(nuevaPila);

    refrezcar();
  }

  // Deshace el ultimo item agregado
  function deshacerUltimo() {
    const clave = pilaDeshacer.pop();
    if (clave === undefined) return;

    setCarrito(prev => prev.filter(item => item.clave !== clave));
    refrezcar();
  }

  // Calcula el total del carrito
  const total = carrito.reduce((sum, item) => sum + item.plato.precio, 0);

  // Cantidad de items en el carrito
  const cantidadItems = carrito.length;

  // Si se puede deshacer
  const puedeDeshacer = !pilaDeshacer.vacia;

  // Confirma el pedido y lo encola
  function confirmarPedido(): number {
    const numero = ultimoNumero + 1;
    setUltimoNumero(numero);

    const pedido: Pedido = {
      numero,
      items: [...carrito],
      total,
      nota,
    };

    // Encolamos el pedido
    colaPedidos.encolar(pedido);

    // Vaciamos carrito, nota y pila de deshacer
    setCarrito([]);
    setNota('');
    const nuevaPila = new Pila<number>();
    setPilaDeshacer(nuevaPila);

    refrezcar();
    return numero;
  }

  // Atiende el siguiente pedido de la cola
  function atenderSiguiente() {
    const pedido = colaPedidos.desencolar();
    if (pedido) {
      pilaAtendidos.push(pedido);
      refrezcar();
    }
  }

  // Devuelve la posicion de un pedido en la cola (-1 si no esta)
  function posicionEnCola(numero: number): number {
    const array = colaPedidos.aArray();
    for (let i = 0; i < array.length; i++) {
      if (array[i].numero === numero) {
        return i;
      }
    }
    return -1;
  }

  return (
    <ComedorContext.Provider
      value={{
        carrito,
        nota,
        pilaAtendidos,
        colaPedidos,
        agregarAlCarrito,
        deshacerUltimo,
        puedeDeshacer,
        total,
        cantidadItems,
        setNota,
        confirmarPedido,
        atenderSiguiente,
        posicionEnCola,
        frente: colaPedidos.frente(),
      }}
    >
      {children}
    </ComedorContext.Provider>
  );
}

// Hook para usar el contexto del comedor
export function useComedor() {
  const context = useContext(ComedorContext);
  if (!context) {
    throw new Error('useComedor debe usarse dentro de ComedorProvider');
  }
  return context;
}
