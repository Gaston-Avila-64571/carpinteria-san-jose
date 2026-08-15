/**
 * js/productos.js
 * ------------------------------------------------------------
 * Fuente única de verdad del catálogo de Carpintería San José.
 * main.js usa este array para renderizar dinámicamente las
 * tarjetas de "Productos destacados" en el Home. Más adelante,
 * catálogo, filtros, carrito y checkout deben reutilizar esta
 * misma información — no duplicarla en el HTML.
 * ------------------------------------------------------------
 */

const productos = [
  {
    id: 1,
    nombre: "Mueble de TV Roble Nórdico",
    categoria: "Muebles TV",
    descripcion: "Mueble bajo de TV en roble macizo con líneas rectas y patas cónicas. Ideal para living minimalistas.",
    precio: 185000,
    imagen: "imagenes/home/mueble-tv-roble.jpg",
    estado: "Disponible",
  },
  {
    id: 2,
    nombre: "Biblioteca Modular Nogal",
    categoria: "Bibliotecas",
    descripcion: "Biblioteca de piso a techo en nogal, con cantidad de estantes configurable según el espacio disponible.",
    precio: 240000,
    imagen: "imagenes/home/biblioteca-nogal.jpg",
    estado: "Personalizable",
  },
  {
    id: 3,
    nombre: "Cómoda 5 Cajones Cedro",
    categoria: "Cómodas",
    descripcion: "Cómoda de cinco cajones en cedro con tiradores de bronce y terminación natural.",
    precio: 195000,
    imagen: "imagenes/home/comoda-cedro.jpg",
    estado: "Disponible",
  },
  {
    id: 4,
    nombre: "Placard 3 Puertas Pino",
    categoria: "Placards",
    descripcion: "Placard de tres puertas en pino tratado, con cajonera interior y barral para colgar.",
    precio: 310000,
    imagen: "imagenes/home/placard-pino.jpg",
    estado: "Por encargo",
  },
];

/** Devuelve los productos a mostrar como destacados en el Home. */
function obtenerDestacados() {
  return productos;
}

/** Devuelve un producto por id, o undefined si no existe. */
function obtenerProductoPorId(id) {
  return productos.find((p) => p.id === Number(id));
}