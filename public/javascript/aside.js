const asideToggler = document.querySelector('#aside-toggler');
asideToggler.addEventListener('click', () => {
    const aside = document.querySelector('aside');
    aside.classList.toggle('open');
    asideToggler.classList.toggle('open');
});