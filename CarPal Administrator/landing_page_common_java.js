// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});


// Dark mode toggle functionality
document.querySelector('.dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Add dark mode implementation here
});
