/**
 * js/main.js
 * ------------------------------------------------------------
 * Lógica del Home. Responsabilidades separadas por función:
 *   - initMenu()               → menú responsive (hamburguesa)
 *   - initHeroCarousel()       → carrusel principal de 4 slides
 *   - renderProductos()        → tarjetas de productos destacados
 *   - initTestimoniosCarousel()→ carrusel de 6 testimonios
 *   - actualizarCarrito()      → contador del carrito
 * ------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeroCarousel();
  renderProductos();
  initTestimoniosCarousel();
  actualizarCarrito();
});

/* ================= MENÚ RESPONSIVE ================= */
function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(abierto));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ================= CARRUSEL HERO ================= */
function initHeroCarousel() {
  const carousel = document.querySelector("[data-hero-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector(".hero-carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".hero-carousel__slide"));
  const dotsWrap = carousel.querySelector(".hero-carousel__dots");
  const prevBtn = carousel.querySelector(".hero-carousel__arrow--prev");
  const nextBtn = carousel.querySelector(".hero-carousel__arrow--next");

  if (slides.length === 0) return;

  let indice = 0;
  let timer = null;
  const INTERVALO_MS = 7000;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-carousel__dot";
    dot.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => irA(i));
    dotsWrap.appendChild(dot);
  });

  function irA(nuevoIndice) {
    indice = (nuevoIndice + slides.length) % slides.length;
    track.style.transform = `translateX(-${indice * 100}%)`;
    dotsWrap.querySelectorAll(".hero-carousel__dot").forEach((dot, i) => {
      dot.setAttribute("aria-selected", String(i === indice));
    });
    reiniciarAutoplay();
  }

  function reiniciarAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => irA(indice + 1), INTERVALO_MS);
  }

  prevBtn?.addEventListener("click", () => irA(indice - 1));
  nextBtn?.addEventListener("click", () => irA(indice + 1));
  carousel.addEventListener("mouseenter", () => timer && clearInterval(timer));
  carousel.addEventListener("mouseleave", reiniciarAutoplay);

  reiniciarAutoplay();
}

/* ================= PRODUCTOS DESTACADOS ================= */
function formatearPrecio(valor) {
  return valor.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

function claseEstado(estado) {
  const mapa = {
    Disponible: "estado--disponible",
    Personalizable: "estado--personalizable",
    "Por encargo": "estado--pedido",
    Agotado: "estado--agotado",
  };
  return mapa[estado] ?? "estado--disponible";
}

function renderProductos() {
  const grid = document.querySelector("[data-productos-destacados]");
  if (!grid || typeof obtenerDestacados !== "function") return;

  const destacados = obtenerDestacados();

  grid.innerHTML = destacados
    .map(
      (producto) => `
        <article class="product-card">
          <div class="product-card__media">
           <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
          />
            <span class="product-card__estado ${claseEstado(producto.estado)}">
              ${producto.estado.toUpperCase()}
            </span>
          </div>
          <div class="product-card__body">
            <span class="product-card__categoria">${producto.categoria.toUpperCase()}</span>
            <h3 class="product-card__nombre">${producto.nombre}</h3>
            <p class="product-card__descripcion">${producto.descripcion}</p>
            <div class="product-card__footer">
              <span class="product-card__precio">${formatearPrecio(producto.precio)}</span>
              <a class="btn btn--outline btn--sm" href="productos.html?id=${producto.id}">
                Ver producto
              </a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

/* ================= CARRUSEL DE TESTIMONIOS ================= */
const TESTIMONIOS = [
  { nombre: "María González", estrellas: 5, texto: "El mueble quedó exactamente como lo imaginábamos. Excelente atención y terminaciones." },
  { nombre: "Lucas Fernández", estrellas: 5, texto: "Nos asesoraron durante todo el proceso y el resultado fue excelente." },
  { nombre: "Sofía Martínez", estrellas: 5, texto: "Trabajo artesanal y mucha atención al detalle. Muy recomendable." },
  { nombre: "Nicolás Romero", estrellas: 5, texto: "Excelente calidad y muy buena comunicación durante todo el proyecto. El resultado superó nuestras expectativas." },
  { nombre: "Valentina López", estrellas: 5, texto: "Nos ayudaron a aprovechar un espacio complicado y el mueble quedó perfecto." },
  { nombre: "Martín Herrera", estrellas: 5, texto: "Se nota el cuidado artesanal en cada detalle. Volveríamos a trabajar con ellos." },
];

function renderTestimonios() {
  const track = document.querySelector("[data-testimonios-track]");
  if (!track) return;

  track.innerHTML = TESTIMONIOS.map(
    (t) => `
      <article class="testimonio">
        <div class="testimonio__estrellas" aria-label="${t.estrellas} de 5 estrellas">${"★".repeat(t.estrellas)}</div>
        <p class="testimonio__texto">"${t.texto}"</p>
        <p class="testimonio__autor">${t.nombre}</p>
      </article>
    `
  ).join("");
}

function initTestimoniosCarousel() {
  renderTestimonios();

  const wrap = document.querySelector("[data-testimonios-carousel]");
  const track = document.querySelector("[data-testimonios-track]");
  if (!wrap || !track) return;

  const items = Array.from(track.children);
  const prevBtn = wrap.querySelector(".testimonios__arrow--prev");
  const nextBtn = wrap.querySelector(".testimonios__arrow--next");
  const dotsWrap = wrap.querySelector("[data-testimonios-dots]");

  let indice = 0;
  const BREAKPOINT_MOBILE = "(max-width: 760px)";

  function visiblesPorPantalla() {
    return window.matchMedia(BREAKPOINT_MOBILE).matches ? 1 : 3;
  }

  function indiceMaximo() {
    return Math.max(0, items.length - visiblesPorPantalla());
  }

  function actualizar() {
    const porcentaje = 100 / visiblesPorPantalla();
    track.style.transform = `translateX(-${indice * porcentaje}%)`;
    if (prevBtn) prevBtn.disabled = indice === 0;
    if (nextBtn) nextBtn.disabled = indice >= indiceMaximo();
    renderDots();
  }

  function renderDots() {
    if (!dotsWrap) return;
    const totalDots = indiceMaximo() + 1;
    dotsWrap.innerHTML = "";
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testimonios__dot";
      dot.setAttribute("aria-label", `Ir al grupo ${i + 1}`);
      dot.setAttribute("aria-selected", String(i === indice));
      dot.addEventListener("click", () => {
        indice = i;
        actualizar();
      });
      dotsWrap.appendChild(dot);
    }
  }

  prevBtn?.addEventListener("click", () => {
    indice = Math.max(0, indice - 1);
    actualizar();
  });

  nextBtn?.addEventListener("click", () => {
    indice = Math.min(indiceMaximo(), indice + 1);
    actualizar();
  });

  window.addEventListener("resize", () => {
    indice = Math.min(indice, indiceMaximo());
    actualizar();
  });

  actualizar();
}

/* ================= CARRITO ================= */
function actualizarCarrito() {
  const contador = document.querySelector("[data-cart-count]");
  if (!contador) return;

  // El carrito todavía no está implementado (se desarrolla más adelante).
  // Queda preparado para leer la cantidad real desde localStorage.
  const cantidad = 0;
  contador.textContent = cantidad;
  contador.hidden = cantidad === 0;
}