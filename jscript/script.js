window.onscroll = function() { stickyNavbar() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("w3-fixed");
        navbar.classList.add("w3-top");
    } else {
        navbar.classList.remove("w3-fixed");
        navbar.classList.remove("w3-top");
    }
}
