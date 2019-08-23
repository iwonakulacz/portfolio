const nav = document.querySelector('.nav');

window.addEventListener('scroll', ()=> {
    const scrollTop = window.scrollY;
    if(scrollTop > 200 && !nav.classList.contains('scroll')){
        nav.classList.add('scroll');
    }
    if(scrollTop < 2){
        nav.classList.remove('scroll');
    }
});