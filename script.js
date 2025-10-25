let pageHeight, windowHeight;
const backToTop = document.querySelector('.back-to-top');
const pokeball = document.querySelectorAll(".pokeball");
const mediaQuery = window.matchMedia('(max-width: 600px)');
const style = document.createElement('style');

function scrollRotate() {
    percent = window.pageYOffset / (pageHeight - windowHeight);
    pokeball.forEach(element => {
        element.style.transform = "rotate(" + percent * 360 + "deg)";
        if(percent==1){
            element.classList.add('pokeball-end');
        }
        else{
            element.classList.remove('pokeball-end');
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

// function crecer(e) {
//     e.target.classList.add('crecer');
// };

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
                transition: 0.3s ease;
            }
            .back-to-top:hover {
                scale: 1.5;
                transform: translateY(-20px);
                transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .poke-bottom {
                transition: box-shadow 0.3s ease;}
            .poke-bottom:hover {
                box-shadow: 0px 0px 40px rgba(249, 251, 255, 0.637);
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

document.head.appendChild(style);

handleMediaChange(mediaQuery);

window.onload = getWindowSize;
window.onresize = getWindowSize;

window.onscroll = function () {
    setTimeout(() => {
        scrollRotate();
    }, 100);
    // console.log(window.pageYOffset);
}

mediaQuery.addEventListener('change', handleMediaChange);

