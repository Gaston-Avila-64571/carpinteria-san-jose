const historiaToggle = document.querySelector(".historia__toggle")
const historiaExtra = document.querySelector(".historia__extra")

if (historiaToggle && historiaExtra) {
    historiaToggle.addEventListener("click", () => {
        const estaVisible = historiaExtra.classList.toggle("is-visible")

        historiaToggle.textContent = estaVisible
            ? "Mostrar menos"
            : "Conocé más"

        historiaToggle.setAttribute("aria-expanded", estaVisible)
    })
}

historiaToggle.textContent = estaVisible
    ? "Mostrar menos"
    : "Conocé más"