// Cola: estructura de datos FIFO (First In, First Out)
// El primer elemento en entrar es el primero en salir
export class Cola<T> {
  // Campo privado: array donde se almacenan los elementos
  #items: T[] = [];
  // Indice del frente de la cola (para no usar shift que es O(n))
  #indiceFrente = 0;

  // Agrega un elemento al final de la cola
  encolar(x: T): void {
    this.#items.push(x);
  }

  // Saca el elemento del frente y avanza el indice
  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const item = this.#items[this.#indiceFrente];
    this.#indiceFrente++;
    // Si ya procesamos todos, reiniciamos array e indice
    // Esto evita que el array crezca indefinidamente
    if (this.#indiceFrente >= this.#items.length) {
      this.#items = [];
      this.#indiceFrente = 0;
    }
    return item;
  }

  // Devuelve el elemento del frente sin sacarlo
  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#indiceFrente];
  }

  // Getter: indica si la cola esta vacia
  get vacia(): boolean {
    return this.#items.length === this.#indiceFrente;
  }

  // Getter: cantidad de elementos en la cola
  get tamanio(): number {
    return this.#items.length - this.#indiceFrente;
  }

  // Devuelve una copia de los elementos desde el frente
  aArray(): T[] {
    return this.#items.slice(this.#indiceFrente);
  }
}
