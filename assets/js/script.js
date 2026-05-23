const menu = document.querySelector('.btnMenuHamburguer');
const logo = document.querySelector('.logoNav');

menu.addEventListener('click', () => {
    const navLi = document.querySelectorAll('.navbar ul li');
    const btnLogin = document.querySelector('.btn-login');
    navLi.forEach((li) => {
        li.classList.toggle('active');
    });
    logo.classList.toggle('active');
    btnLogin.classList.toggle('active');
});