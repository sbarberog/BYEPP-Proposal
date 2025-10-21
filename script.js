let pageHeight, windowHeight;

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