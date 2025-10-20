

let pageHeight = document.body.scrollHeight;
let windowHeight = window.innerHeight;
// console.log(pageHeight, innerHeight);

window.onscroll = function () {
    scrollRotate();
    // console.log(window.pageYOffset);
}

function scrollRotate() {
    let pokeball = document.querySelectorAll(".pokeball");
    percent = window.pageYOffset / (pageHeight - windowHeight);
    pokeball.forEach(element => {
        element.style.transform = "rotate(" + percent * 360 + "deg)";
    });
}