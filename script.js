document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const btnFlip = document.getElementById('btnFlip');
    const btnFlipBack = document.getElementById('btnFlipBack');

    // Manejo del giro 3D de la tarjeta
    btnFlip.addEventListener('click', () => {
        cardContainer.classList.add('flipped');
    });

    btnFlipBack.addEventListener('click', () => {
        cardContainer.classList.remove('flipped');
    });
});