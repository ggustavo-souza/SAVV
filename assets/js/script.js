const menu = document.querySelector('.btnMenuHamburguer');
const logo = document.querySelector('.logoNav');
console.log(logo)
const elementosAnimar = document.querySelectorAll('.escondido');
const btnLogin = document.querySelector('.btn-login');
const btnLoginMinhaConta = document.querySelector('.btn-login-minhaConta');

function toggleMenu() {
    if(btnLoginMinhaConta !== null) {btnLoginMinhaConta.classList.toggle('active');}
    if(btnLogin !== null) {btnLogin.classList.toggle('active');}
    if(logo !== null) {logo.classList.toggle('active');}
}

menu.addEventListener('click', () => {
    const navLi = document.querySelectorAll('.navbar ul li');
    navLi.forEach((li) => {
        li.classList.toggle('active');
    });
    toggleMenu();

});

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animar');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.graficosDados, .headerDados');
elementsToAnimate.forEach(el => observer.observe(el));

const observerServicos = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementosServicos = document.querySelectorAll('.articleServicos, .asideServicos');
elementosServicos.forEach(el => observerServicos.observe(el));

