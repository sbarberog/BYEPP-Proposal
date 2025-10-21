let pageHeight, windowHeight;
const backToTop = document.querySelector('.back-to-top');

function scrollRotate() {
    let pokeball = document.querySelectorAll(".pokeball");
    percent = window.pageYOffset / (pageHeight - windowHeight);
    pokeball.forEach(element => {
        element.style.transform = "rotate(" + percent * 360 + "deg)";
    });
}

function getWindowSize() {
    pageHeight = document.body.scrollHeight;
    windowHeight = window.innerHeight;
    console.log(pageHeight, innerHeight);
}

window.onload = getWindowSize;
window.onresize = getWindowSize;

window.onscroll = function () {
    scrollRotate();
    // console.log(window.pageYOffset);
}

// deactivate hover style on mobile
function disableHoverOnMobile() {
    // Detección básica de dispositivos táctiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        const style = document.createElement('style');
        style.innerHTML = `
        .back-to-top:hover {
          transform: none !important;
          transition: none !important;
        }
      `;
        document.head.appendChild(style);
    }
}

backToTop.addEventListener('click', () => {
    backToTop.classList.add('animar');

    // Espera el tiempo de la animación y luego quita la clase
    setTimeout(() => {
        backToTop.classList.remove('animar');
    }, 400); // duración igual a la animación CSS
});

// Ejecutar al cargar la página
disableHoverOnMobile();