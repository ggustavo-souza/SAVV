const menu = document.querySelector('.btnMenuHamburguer');
const logo = document.querySelector('.logoNav');

menu.addEventListener('click', () => {
    const navLi = document.querySelectorAll('.navbar ul li');
    navLi.forEach((li) => {
        li.classList.toggle('active');
    });
    logo.classList.toggle('active');
});