const menuItems = document.querySelectorAll('.menu-item');
const closeButtons = document.querySelectorAll('.close-button');

// Handle opening individual popups (multiple allowed)
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const popupId = item.getAttribute('data-popup');
        const popup = document.getElementById(`popup-${popupId}`);
        if (popup) {
            popup.classList.add('active');
        }
    });
});

// Handle closing individual popups
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup-overlay');
        popup.classList.remove('active');
    });
});

// Make each popup draggable within viewport and below navbar
document.querySelectorAll('.popup-content').forEach(popup => {
    const header = popup.querySelector('.draggable-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.style.cursor = 'move';

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = popup.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        popup.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const topBarHeight = document.querySelector('.top-bar').offsetHeight;

        const minX = 0;
        const minY = topBarHeight + 10; // 10px padding below nav
        const maxX = window.innerWidth - popupWidth;
        const maxY = window.innerHeight - popupHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Clamp movement within bounds
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        popup.style.left = `${newX}px`;
        popup.style.top = `${newY}px`;
        popup.style.transform = 'none'; // Disable centering after move
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// Accordion functionality
document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        btn.classList.toggle('active');
        content.classList.toggle('open');
    });
});
