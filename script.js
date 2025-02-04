// script.js
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = event.target.getAttribute('href');
        window.location.href = page;
    });
});
