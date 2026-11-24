// 1. La liste de tes 3 photos
const photosBanniere = [
    "images/images1.jpeg",
    "images/images2.jpeg",
    "images/images3.jpeg"
];

let indexActuel = 0; // On commence à la 1ère photo (en JS, on compte à partir de 0)

// 2. On attrape la bannière et les deux boutons
const banniere = document.querySelector(".hero");
const btnSuivant = document.querySelector("#btn-next");
const btnPrecedent = document.querySelector("#btn-prev");

// 3. Fonction pour mettre à jour l'image de fond
function changerPhoto() {
    banniere.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.8)), url('${photosBanniere[indexActuel]}')`;
}

// 4. Clic sur la flèche droite (Suivant)
btnSuivant.addEventListener("click", function() {
    indexActuel = indexActuel + 1;
    // Si on dépasse la 3ème photo (index 2), on revient à la 1ère (index 0)
    if (indexActuel >= photosBanniere.length) {
        indexActuel = 0;
    }
    changerPhoto();
});

// 5. Clic sur la flèche gauche (Précédent)
btnPrecedent.addEventListener("click", function() {
    indexActuel = indexActuel - 1;
    // Si on recule avant la 1ère photo, on va à la dernière
    if (indexActuel < 0) {
        indexActuel = photosBanniere.length - 1;
    }
    changerPhoto();
});