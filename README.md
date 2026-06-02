# Link a la calculadora:

http://35.239.29.236/24089/Snoopy/calculadora-react/

# Calculadora React

Calculadora web construida con React, TypeScript y Vite.

## Instalacion

```bash
bun install
```

## Correr la aplicacion

```bash
bun dev
```

## Correr los tests

```bash
bun test
```

O para correr una sola vez sin watch mode:

```bash
bun run test:run
```

## Correr el linter

```bash
bun run lint
```

## Correr Storybook

```bash
bun run storybook
```

Abre en [http://localhost:6006](http://localhost:6006)

## Funcionalidades

- Operaciones: suma, resta, multiplicacion, division, modulo
- Punto decimal
- Toggle +/- para negativos en input
- Limite de 9 caracteres en pantalla
- Muestra ERROR si el resultado es negativo o mayor a 999999999
- Navegacion por teclado fisico
- CI con GitHub Actions
