let pageHeight, windowHeight;
const backToTop = document.querySelector('.back-to-top');
const pokeball = document.querySelectorAll(".pokeball");
const mediaQuery = window.matchMedia('(max-width: 600px)');
const style = document.createElement('style');
// gallery
const images = [
    { src: "img/byepp-hud.jpg", caption: "HUD example" },
    { src: "img/byepp-explanation.jpg", caption: "HUD explanation" }
];
let current = 0;
let startX = 0;
const lightboxImg = document.getElementById("lightbox-img");

function scrollAction() {
    percent = window.pageYOffset / (pageHeight - windowHeight);
    pokeball.forEach(element => {
        element.style.transform = "rotate(" + percent * 360 + "deg)";
        if (percent > 0.98) {
            element.classList.add('pokeball-end');
            backToTop.classList.add("end-position");
        }
        else {
            element.classList.remove('pokeball-end');
            backToTop.classList.remove("end-position");
        }
    });
}

function botar(e) {
    e.stopPropagation();
    backToTop.classList.add('botar');
    // console.log("animando...");
    // Espera el tiempo de la animación y luego quita la clase
    setTimeout(() => {
        backToTop.classList.remove('botar');
    }, 400); // duración igual a la animación CSS
};

function handleMediaChange() {

    if (mediaQuery.matches) {
        backToTop.addEventListener('click', botar);
        style.innerHTML = '';
        console.log("Style: mobile");
    }
    else {
        backToTop.removeEventListener('click', botar);
        // backToTop.addEventListener('hover', crecer);
        style.innerHTML = `
            .back-to-top {
                // transition: 0.3s ease;
            }
            .back-to-top:hover {
                transition: 0.3s ease;
                scale: 1.5;
                transform: translateY(-20px);
                transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .poke-bottom {
                transition: box-shadow 0.3s ease;}
            .poke-bottom:hover {
                box-shadow: 0px 0px 40px rgba(249, 251, 255, 0.637);
            }
            .section:hover li, .section:hover p{
                color: #1b1b1b;
            }
            .conclusion:hover li, .conclusion:hover p{
                color: #ffffff;
            }
            @media (min-width: 1100px) {
            .section:hover {
                // background: #fff;
                padding: 0px 100px 40px 100px;
                // max-width: 1100px;
                z-index: 1;
                // scale: 1.1;
                transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
                box-shadow: 4px 4px 0 #ffcb05, 1px 1px 2px rgba(3, 7, 18, 0.116),
                    3px 3px 8px rgba(3, 7, 18, 0.171), 6px 6px 19px rgba(3, 7, 18, 0.514);
            }}   
            .img-container:hover img {
                transform: scale(1.2); /* Zoom sin ampliar el recuadro */
            }
            `;
        console.log("Style: desktop");
    }
}

function getWindowSize() {
    pageHeight = document.body.scrollHeight;
    windowHeight = window.innerHeight;
    // console.log(pageHeight, innerHeight);
}

function openLightbox(index) {
    current = index;
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const cap = document.getElementById("caption");

    img.src = images[current].src;
    cap.textContent = images[current].caption;

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; //  Desactiva scroll de la página
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = ""; //  Restaura el scroll
}

function changeImage(direction) {
    current = (current + direction + images.length) % images.length;
    const img = document.getElementById("lightbox-img");
    const cap = document.getElementById("caption");

    img.src = images[current].src;
    cap.textContent = images[current].caption;
}

document.head.appendChild(style);

handleMediaChange(mediaQuery);

window.onload = getWindowSize;
window.onresize = getWindowSize;

window.onscroll = function () {
    // set time delay to avoid incorrect detection of scroll % on mobile browsers
    setTimeout(() => {
        scrollAction();
    }, 50);
    // console.log(window.pageYOffset);
}

mediaQuery.addEventListener('change', handleMediaChange);

// Gallery: Cerrar con clic fuera
document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
});
// Controles de teclado
document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

// Control táctil (swipe)

lightboxImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightboxImg.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) { // umbral de deslizamiento
        if (diff > 0) changeImage(1);   // desliza izquierda → siguiente
        else changeImage(-1);           // desliza derecha → anterior
    }
});
