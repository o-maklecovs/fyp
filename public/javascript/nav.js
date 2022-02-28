const toggler = document.querySelector('#menu-toggler');
toggler.addEventListener('click', () => {
    const menu = document.querySelector('nav');
    menu.classList.toggle('open');
});