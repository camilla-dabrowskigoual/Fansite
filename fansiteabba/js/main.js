document.addEventListener("DOMContentLoaded", () => {
    // 1. Injection du lien de retour vers le portail en haut dans le menu
    function ajouterLienPortailHaut() {
        const menuListe = document.querySelector(".menu-principal ul");
        if (!menuListe) return;

        const estDansSousPage = window.location.pathname.includes("/pages/");
        const cheminAccueil = estDansSousPage ? "../../index.html" : "../index.html";

        const li = document.createElement("li");
        const lien = document.createElement("a");
        lien.href = cheminAccueil;
        lien.textContent = "← Portail";

        li.appendChild(lien);
        menuListe.prepend(li); // Place le lien tout à gauche du menu
    }

    ajouterLienPortailHaut();

    // 2. Logique du carrousel 3D Coverflow (uniquement sur la page d'accueil ABBA)
    const stage = document.getElementById("coverflow-stage");
    if (!stage) return;

    const cards = Array.from(stage.querySelectorAll(".cf-card"));
    const prevBtn = document.querySelector(".cf-prev");
    const nextBtn = document.querySelector(".cf-next");

    let activeIndex = Math.floor(cards.length / 2);

    function updateCoverflow() {
        cards.forEach((card, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);

            if (offset === 0) {
                card.classList.add("active");
                card.style.transform = "translateX(0px) translateZ(60px) rotateY(0deg) scale(1)";
                card.style.opacity = "1";
                card.style.filter = "brightness(1)";
                card.style.zIndex = 10;
            } else if (absOffset <= 2) {
                card.classList.remove("active");
                const direction = offset > 0 ? 1 : -1;
                const translateX = offset * 165;
                const translateZ = -absOffset * 90;
                const rotateY = -direction * 28;
                const scale = 1 - absOffset * 0.14;
                const opacity = 1 - absOffset * 0.28;

                card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.opacity = opacity.toString();
                card.style.filter = `brightness(${1 - absOffset * 0.18})`;
                card.style.zIndex = 10 - absOffset;
            } else {
                card.classList.remove("active");
                const direction = offset > 0 ? 1 : -1;
                card.style.transform = `translateX(${direction * 330}px) translateZ(-250px) rotateY(${-direction * 35}deg) scale(0.6)`;
                card.style.opacity = "0";
                card.style.zIndex = 1;
            }
        });
    }

    function goToSlide(newIndex) {
        if (newIndex < 0) {
            activeIndex = cards.length - 1;
        } else if (newIndex >= cards.length) {
            activeIndex = 0;
        } else {
            activeIndex = newIndex;
        }
        updateCoverflow();
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => goToSlide(index));
    });

    prevBtn.addEventListener("click", () => goToSlide(activeIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(activeIndex + 1));

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goToSlide(activeIndex - 1);
        if (e.key === "ArrowRight") goToSlide(activeIndex + 1);
    });

    let autoplay = setInterval(() => goToSlide(activeIndex + 1), 4000);
    stage.parentElement.addEventListener("mouseenter", () => clearInterval(autoplay));
    stage.parentElement.addEventListener("mouseleave", () => {
        autoplay = setInterval(() => goToSlide(activeIndex + 1), 4000);
    });

    updateCoverflow();
});