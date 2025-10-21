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
    // console.log(pageHeight, innerHeight);
}

function disableHoverOnMobile() {
    // Detección básica de dispositivos táctiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        const style = document.createElement('style');
        style.innerHTML = `
        .back-to-top, .back-to-top:hover {
          scale:none;
          transform:none;
        }
        .poke-bottom, .poke-bottom:hover{
        box-shadow: 0px 0px 20px #f9fbff50;
        transition:none
        }
      `;
        document.head.appendChild(style);
        // console.log("Mobile detected, disabled hover style...");
    }
}

window.onload = getWindowSize;
window.onresize = getWindowSize;

window.onscroll = function () {
    scrollRotate();
    // console.log(window.pageYOffset);
}

// Ejecutar al cargar la página
disableHoverOnMobile();

backToTop.addEventListener('click', () => {
    backToTop.classList.add('animar');
    // console.log("animando...");

    // Espera el tiempo de la animación y luego quita la clase
    setTimeout(() => {
        backToTop.classList.remove('animar');
    }, 400); // duración igual a la animación CSS
});