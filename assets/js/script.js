const menu = document.querySelector('.btnMenuHamburguer');

menu.addEventListener('click', () => {
    const navLi = document.querySelectorAll('.navbar ul li');
    navLi.forEach((li) => {
        li.classList.toggle('active');
    });
});