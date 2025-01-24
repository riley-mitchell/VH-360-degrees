document.querySelectorAll('nav ul li').forEach(item => {
    item.addEventListener('click', () => {
        alert(`You clicked on ${item.innerText}`);
    });
});
