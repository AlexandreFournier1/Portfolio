function initCarousel(cardsContainer) {
    const cardSelector = cardsContainer.dataset.cardSelector;
    const originalCards = Array.from(cardsContainer.children);
    const firstCard = cardsContainer.firstElementChild;

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        cardsContainer.insertBefore(clone, firstCard);
    });

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        cardsContainer.appendChild(clone);
    });

    let setWidth = 0;

    function initLoop() {
        setWidth = cardsContainer.scrollWidth / 3;
        cardsContainer.scrollLeft = setWidth;
    }

    window.addEventListener('load', initLoop);
    window.addEventListener('resize', initLoop);

    let isPressed = false;
    let startX;
    let currentScrollLeft;

    cardsContainer.addEventListener('mousedown', (e) => {
        isPressed = true;
        startX = e.pageX - cardsContainer.offsetLeft;
        currentScrollLeft = cardsContainer.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isPressed = false;
    });

    cardsContainer.addEventListener('mouseleave', () => {
        isPressed = false;
    });

    cardsContainer.addEventListener('mousemove', (e) => {
        if (!isPressed) return;
        e.preventDefault();

        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = currentScrollLeft - walk;
    });

    cardsContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            cardsContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    cardsContainer.addEventListener('scroll', () => {
        if (!setWidth) return;

        if (cardsContainer.scrollLeft < setWidth) {
            cardsContainer.scrollLeft += setWidth;
        } else if (cardsContainer.scrollLeft >= setWidth * 2) {
            cardsContainer.scrollLeft -= setWidth;
        }
    });

    const MIN_SCALE = 0.8;
    const MAX_SCALE = 1.15;
    let rafId = null;

    function updateCardScales() {
        const containerRect = cardsContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        const allCards = cardsContainer.querySelectorAll(cardSelector);

        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;

            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.width / 2 + cardRect.width / 2;

            const ratio = Math.min(distance / maxDistance, 1);
            const scale = MAX_SCALE - ratio * (MAX_SCALE - MIN_SCALE);

            card.style.transform = `scale(${scale})`;
        });

        rafId = null;
    }

    function requestScaleUpdate() {
        if (rafId === null) {
            rafId = requestAnimationFrame(updateCardScales);
        }
    }

    cardsContainer.addEventListener('scroll', requestScaleUpdate);
    window.addEventListener('resize', requestScaleUpdate);
    window.addEventListener('load', requestScaleUpdate);
}

document.querySelectorAll('.cards-menu').forEach(initCarousel);