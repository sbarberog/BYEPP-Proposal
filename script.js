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


function disableHoverOnMobile() {
    // Detección básica de dispositivos táctiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        const style = document.createElement('style');
        style.innerHTML = `
        .back-to-top, .back-to-top:hover {
          transform: none !important;
          transition: none !important;
          scale:none;
        }
      `;
        document.head.appendChild(style);
        console.log("Disabled hover style");
    }
}

// Ejecutar al cargar la página
disableHoverOnMobile();

backToTop.addEventListener('click', () => {
    backToTop.classList.add('animar');

    // Espera el tiempo de la animación y luego quita la clase
    setTimeout(() => {
        backToTop.classList.remove('animar');
    }, 400); // duración igual a la animación CSS
});

/**
 * Comprueba si el navegador está en "modo móvil" usando múltiples heurísticos.
 * Devuelve true si consideramos que está en móvil/híbrido táctil/viewport móvil.
 */
// function isMobileNavigationMode() {
//   try {
//     // 1) userAgentData (más moderno, si existe)
//     if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
//       if (navigator.userAgentData.mobile) return true;
//     }

//     // 2) userAgent (fallback). Busca palabras comunes (no perfecto, pero útil)
//     const ua = navigator.userAgent || navigator.vendor || window.opera || '';
//     if (/Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|Mobile/i.test(ua)) {
//       return true;
//     }

//     // 3) capacidad táctil: maxTouchPoints
//     if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) return true;
//     if ('ontouchstart' in window) return true;

//     // 4) media queries de entrada: pointer coarse / no hover
//     if (window.matchMedia) {
//       if (window.matchMedia('(pointer: coarse)').matches) return true;
//       if (window.matchMedia('(hover: none)').matches) return true;
//     }

//     // 5) viewport pequeño (opcional heurístico)
//     if (window.innerWidth && window.innerWidth <= 768) return true;

//   } catch (e) {
//     // si algo falla, devolvemos false por seguridad
//     console.warn('isMobileNavigationMode check failed:', e);
//   }
//   return false;
// }

// /**
//  * Inyecta una regla CSS que anula el :hover de .back-to-top en móviles.
//  * Si ya existe, no la duplica.
//  */
// function disableBackToTopHoverOnMobile() {
//   if (!isMobileNavigationMode()) return; // salir si no estamos en modo móvil

//   const STYLE_ID = 'disable-back-to-top-hover-mobile';
//   if (document.getElementById(STYLE_ID)) return; // ya inyectado

//   const css = `
//     /* Anula transform y transition en hover para evitar estado "pegado" en móviles */
//     .back-to-top {
//       transform: none !important;
//       transition: none !important;
//       scale:none;
//     }
//     /* seguridad extra: anular también focus-visible que algunos navegadores usan */
//     .back-to-top:focus:hover,
//     .back-to-top:hover,
//     .back-to-top:focus {
//       transform: none !important;
//       transition: none !important;
//       scale:none;
//     }
//   `;

//   const style = document.createElement('style');
//   style.id = STYLE_ID;
//   style.appendChild(document.createTextNode(css));
//   document.head.appendChild(style);
//   console.log("Desactivando efecto Hover...");
// }

// // Ejecutar en DOMContentLoaded para asegurar que head existe
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', disableBackToTopHoverOnMobile);
// } else {
//   disableBackToTopHoverOnMobile();
// }