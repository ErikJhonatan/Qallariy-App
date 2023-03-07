const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navbar = document.querySelector('.navbar');
const headerHero = document.querySelector('.header-hero');

// Agrego un escuchador de eventos al icono del menú
menuIcon.addEventListener('click', () => {
    navbar.classList.remove('inactive');
    navbar.classList.add('active');
});
closeIcon.addEventListener('click', () => {
    navbar.classList.remove('active');
    navbar.classList.add('inactive');
});
// Agrego un escuchador de eventos a las secciones del menú
const navbarItem = document.querySelectorAll('.navbar li a');
navbarItem.forEach(section => {
    section.addEventListener('click', () => {
        navbarItem.forEach(section => {
            section.classList.remove('active');
        });
        section.classList.toggle('active');
    });
});



// Si el usuario hace scroll, coloca la clase "scrolled" en el elemento <nav>
window.addEventListener('scroll', () => {
    const headerNavbar = document.querySelector('.header-navbar');
    headerNavbar.classList.toggle('scrolled-navbar', window.scrollY > 0);
    headerHero.classList.toggle('scrolled-hero', window.scrollY > 0);
});