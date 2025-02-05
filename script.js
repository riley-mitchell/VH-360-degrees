// script.js

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("table a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href");
            window.location.href = page;
        });
    });
});
