# Comedor IPF - App de pedidos

App de comida para el Instituto Politécnico Formosa, desarrollada con Expo Router (SDK 54).

## Como correr la app

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm start
```

3. Escanear el QR con Expo Go (Android) o usar el simulador iOS.

## Estructura de rutas (src/app)

```
src/app/
├── _layout.tsx           # Layout raiz: providers, navegacion principal
├── (tabs)/               # Pestanas inferiores
│   ├── _layout.tsx       # Configuracion de tabs
│   ├── index.tsx         # / - Inicio
│   ├── menu/             # Menu de platos
│   │   ├── _layout.tsx
│   │   ├── index.tsx    # /menu - Lista por categorias
│   │   └── [id].tsx     # /menu/1 - Detalle de plato
│   └── carrito/          # Carrito de compras
│       ├── _layout.tsx
│       ├── index.tsx    # /carrito
│       └── nota.tsx     # /carrito/nota
├── categorias/
│   └── [categoria].tsx   # /categorias/desayuno
├── buscar.tsx            # /buscar?q=...&categoria=...
├── confirmar.tsx        # /confirmar (modal)
├── turno/
│   └── [numero].tsx      # /turno/1
├── login.tsx            # /login (modal)
├── cocina/              # Area de cocina (protegida)
│   ├── _layout.tsx      # Drawer
│   ├── index.tsx        # /cocina - Pedidos pendientes
│   └── atendidos.tsx    # /cocina/atendidos
├── ayuda/
│   ├── index.tsx        # /ayuda
│   └── [...slug].tsx    # /ayuda/horarios
├── pedido.tsx           # /pedido -> redirect a /carrito
└── +not-found.tsx      # 404
```

## Porque se usa replace en la confirmacion?

En `confirmar.tsx` se usa `router.replace()` en vez de `router.push()`:

```tsx
router.replace({
  pathname: "/turno/[numero]",
  params: { numero },
});
```

**Problema con push:** Si el usuario confirma y va al turno, al tocar "atrás" volvería a la pantalla de confirmación y podría confirmar dos veces el mismo pedido.

**Solucion con replace:** Replace sustituye la pantalla actual en la pila de navegación, entonces la confirmación desaparece del historial. El usuario no puede volver atrás a confirmar nuevamente.

## Deep link de prueba

Para probar con Expo Go:

```
exp://TU_IP:8081/--/menu/3
```

Reemplazar `TU_IP` con la dirección IP de tu computadora (可见 en la terminal al ejecutar `npm start`).

## Capturas de pantalla

[INSERTAR CAPTURAS AQUI]

- Inicio
- Menu por categorias
- Detalle de plato
- Carrito
- Turno asignado
- Area de cocina (con sesion)
- Pedidos atendidos
