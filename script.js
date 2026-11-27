// =========================================
// 1. MENU BURGER MOBILE
// =========================================
const btnBurger = document.querySelector("#btn-burger");
const navLinks = document.querySelector("#nav-links");

if (btnBurger && navLinks) {
    btnBurger.addEventListener("click", () => {
        const estOuvert = navLinks.classList.toggle("ouvert");
        btnBurger.setAttribute("aria-expanded", estOuvert);
    });
}

// =========================================
// 2. CARROUSEL INTELLIGENT (Autoplay + Dots + Swipe)
// =========================================
const hero = document.querySelector("#hero");
const railBanniere = document.querySelector(".banniere");
const images = document.querySelectorAll(".banniere img");
const btnSuivant = document.querySelector("#btn-next");
const btnPrecedent = document.querySelector("#btn-prev");
const legendeSlide = document.querySelector("#legende-slide");
const dotsContainer = document.querySelector("#carousel-dots");

if (railBanniere && images.length > 0) {
    let indexActuel = 0;
    let intervalleAuto;

    // Création dynamique des points indicateurs
    images.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.setAttribute("aria-label", `Aller à la photo ${idx + 1}`);
        if (idx === 0) dot.classList.add("actif");
        dot.addEventListener("click", () => {
            indexActuel = idx;
            mettreAJourCarrousel();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function mettreAJourCarrousel() {
        railBanniere.style.transform = `translateX(-${indexActuel * 100}%)`;
        if (legendeSlide) {
            legendeSlide.textContent = images[indexActuel].dataset.legende || "";
        }
        dots.forEach((dot, idx) => {
            dot.classList.toggle("actif", idx === indexActuel);
        });
    }

    function photoSuivante() {
        indexActuel = (indexActuel + 1) % images.length;
        mettreAJourCarrousel();
    }

    function photoPrecedente() {
        indexActuel = (indexActuel - 1 + images.length) % images.length;
        mettreAJourCarrousel();
    }

    btnSuivant.addEventListener("click", photoSuivante);
    btnPrecedent.addEventListener("click", photoPrecedente);

    // Navigation clavier
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") photoSuivante();
        if (e.key === "ArrowLeft") photoPrecedente();
    });

    // Défilement automatique toutes les 5s avec pause au survol
    function demarrerAutoplay() {
        intervalleAuto = setInterval(photoSuivante, 5000);
    }

    function arreterAutoplay() {
        clearInterval(intervalleAuto);
    }

    demarrerAutoplay();
    hero.addEventListener("mouseenter", arreterAutoplay);
    hero.addEventListener("mouseleave", demarrerAutoplay);

    // Support tactile (Swipe mobile)
    let touchStartX = 0;
    hero.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    hero.addEventListener("touchend", (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (diff > 50) photoSuivante();
        if (diff < -50) photoPrecedente();
    }, { passive: true });
}

// =========================================
// 3. RECHERCHE & FILTRES DES ARTISTES
// =========================================
const inputRecherche = document.querySelector("#recherche-artiste");
const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const cartesArtistes = document.querySelectorAll(".carte-artiste");
const messageVide = document.querySelector("#message-vide");

let filtreActif = "tous";

function filtrerArtistes() {
    const texte = inputRecherche.value.toLowerCase().trim();
    let visibles = 0;

    cartesArtistes.forEach((carte) => {
        const nom = carte.dataset.nom;
        const categories = carte.dataset.categorie;
        const correspondTexte = nom.includes(texte);
        const correspondFiltre = filtreActif === "tous" || categories.includes(filtreActif);

        if (correspondTexte && correspondFiltre) {
            carte.style.display = "flex";
            visibles++;
        } else {
            carte.style.display = "none";
        }
    });

    if (messageVide) {
        messageVide.hidden = visibles > 0;
    }
}

if (inputRecherche) {
    inputRecherche.addEventListener("input", filtrerArtistes);
}

boutonsFiltre.forEach((btn) => {
    btn.addEventListener("click", () => {
        boutonsFiltre.forEach((b) => b.classList.remove("actif"));
        btn.classList.add("actif");
        filtreActif = btn.dataset.filtre;
        filtrerArtistes();
    });
});

// =========================================
// 4. MODALE D'APERÇU RAPIDE & BOUTON TOP
// =========================================
const modale = document.querySelector("#modale-artiste");
const modaleTitre = document.querySelector("#modale-titre");
const modaleTexte = document.querySelector("#modale-texte");
const modaleLien = document.querySelector("#modale-lien");
const btnFermerModale = document.querySelector("#btn-fermer-modale");

document.querySelectorAll(".btn-apercu").forEach((btn) => {
    btn.addEventListener("click", () => {
        modaleTitre.textContent = btn.dataset.titre;
        modaleTexte.textContent = btn.dataset.infos;
        modaleLien.href = btn.dataset.lien;
        modale.classList.add("ouverte");
        modale.setAttribute("aria-hidden", "false");
    });
});

function fermerModale() {
    modale.classList.remove("ouverte");
    modale.setAttribute("aria-hidden", "true");
}

if (btnFermerModale && modale) {
    btnFermerModale.addEventListener("click", fermerModale);
    modale.addEventListener("click", (e) => {
        if (e.target === modale) fermerModale();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modale.classList.contains("ouverte")) fermerModale();
    });
}

// Bouton retour en haut au scroll
const btnTop = document.querySelector("#btn-top");
window.addEventListener("scroll", () => {
    if (btnTop) {
        btnTop.classList.toggle("visible", window.scrollY > 350);
    }
});