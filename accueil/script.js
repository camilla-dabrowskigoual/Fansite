const railBanniere = document.querySelector(".banniere");
const images = document.querySelectorAll(".banniere img");
const btnSuivant = document.querySelector("#btn-next");
const btnPrecedent = document.querySelector("#btn-prev");

let indexActuel = 0;

function glisserVersPhoto() {
    // Décale le rail de -100% à chaque photo (-0%, -100%, -200%, etc.)
    railBanniere.style.transform = `translateX(-${indexActuel * 100}%)`;
}

btnSuivant.addEventListener("click", function() {
    indexActuel = (indexActuel + 1) % images.length;
    glisserVersPhoto();
});

btnPrecedent.addEventListener("click", function() {
    indexActuel = (indexActuel - 1 + images.length) % images.length;
    glisserVersPhoto();
});