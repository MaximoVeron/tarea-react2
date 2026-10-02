// Pila: estructura de datos LIFO (Last In, First Out)
// El ultimo elemento agregado es el primero en salir
export class Pila<T> {
  // Campo privado: array donde se almacenan los elementos
  #items: T[] = [];

  // Agrega un elemento arriba de la pila
  push(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el elemento del tope
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Devuelve el elemento del tope sin sacarlo
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  // Getter: indica si la pila esta vacia
  get vacia(): boolean {
    return this.#items.length === 0;
  }

  // Getter: cantidad de elementos en la pila
  get tamanio(): number {
    return this.#items.length;
  }

  // Devuelve una copia del array de la base al tope
  aArray(): T[] {
    return [...this.#items];
  }
}
