const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;
let header = document.querySelector('.main-header');
let sectionA = document.querySelector('.section-a') || document.querySelector('.section-ab') || document.querySelector('.section-aa') || document.querySelector('.section-ac')
|| document.querySelector('.about-us-container') || document.querySelector('.section-awb') || document.querySelector('.section-aserp') || document.querySelector('.section-av')
|| document.querySelector('.section-atma') || document.querySelector('.section-ablog') || document.querySelector('.section-abloga') || document.querySelector('.section-ju')  || document.querySelector('.section-jun');
if (!sectionA) {
    console.error("Unable to find .section-a, .section-ab, .section-aa, .section-ac, .about-us-container, .section-awb, .section-aserp. .section-av, .section-tma, .section-ba, .section-ablog, .section-abloga, .section-ju, .section-jun or .section-abloga");
}
let lastScrollTop = 0;

btn.addEventListener('click', navToggle);
window.addEventListener('scroll', handleScroll);

function navToggle() {
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}

function countUp() {
    counters.forEach((counter) => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 100;

            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 75);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

function reset() {
    counters.forEach((counter) => (counter.innerHTML = '0'));
}

function smoothHeaderFade() {
    header.style.transition = "none";  
    header.style.opacity = 0;  
    setTimeout(() => {
        header.style.transition = "";
        header.style.opacity = 1;  
    }, 50);
}

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !btn.contains(event.target) && menu.classList.contains('show-menu')) {
        navToggle();  
        smoothHeaderFade();
    }
});

function handleScroll() {
    const scrollPos = window.scrollY;
    const halfway = sectionA.clientHeight / 2;

    // Counter Animation Logic
    if (scrollPos > 100 && !scrollStarted) {
        countUp();
        scrollStarted = true;
    } else if (scrollPos < 100 && scrollStarted) {
        reset();
        scrollStarted = false;
    }

    // Header Fade Logic
    if (scrollPos > lastScrollTop && scrollPos > halfway) {
        // Scrolling down
        header.style.transition = "opacity 0.4s";
        header.style.opacity = "0";
    } else {
        // Scrolling up
        header.style.transition = "opacity 0.4s, background-color 0.4s";
        header.style.opacity = "1";
        if (scrollPos <= halfway) {
            header.classList.remove('black-background');
        } else {
            header.classList.add('black-background');
        }
    }
    lastScrollTop = scrollPos;
}

