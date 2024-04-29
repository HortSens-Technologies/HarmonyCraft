// Chemin vers le répertoire contenant les fichiers audio
const repertoire = "D:/MUSIC GEN PYTHON/AUDIOS";

// Dictionnaire des catégories avec leurs numéros de piste correspondants
const categories = {
  instrumental: Array.from({ length: 10 }, (_, i) => i + 1),
  vocal: Array.from({ length: 10 }, (_, i) => i + 11),
  rythme: Array.from({ length: 10 }, (_, i) => i + 21),
  "effets sonores": Array.from({ length: 10 }, (_, i) => i + 31),
};

// Liste pour stocker les combinaisons déjà jouées
const combinaisonsJouees = [];

function jouerCombinaison() {
  // Générer une combinaison aléatoire qui n'a pas été jouée
  let combinaison = [];
  for (const cat in categories) {
    const index = Math.floor(Math.random() * categories[cat].length);
    combinaison.push(categories[cat][index]);
  }
  while (combinaisonsJouees.includes(combinaison.join("-"))) {
    combinaison = [];
    for (const cat in categories) {
      const index = Math.floor(Math.random() * categories[cat].length);
      combinaison.push(categories[cat][index]);
    }
  }

  // Ajouter la combinaison à la liste des combinaisons déjà jouées
  combinaisonsJouees.push(combinaison.join("-"));

  // Charger les fichiers audio de chaque catégorie
  const pistesAudio = [];
  for (const piste of combinaison) {
    const cheminFichier = `${repertoire}/${piste}.mp3`;
    pistesAudio.push(new Audio(cheminFichier));
  }

  // Jouer les pistes audio simultanément
  pistesAudio.forEach((audio) => audio.play());
}

document.getElementById("genererMusique").addEventListener("click", jouerCombinaison);

document.getElementById("telechargerMusique").addEventListener("click", function () {
  const combinaison = [];
  for (const cat in categories) {
    const index = Math.floor(Math.random() * categories[cat].length);
    combinaison.push(categories[cat][index]);
  }

  // Charger les fichiers audio de chaque catégorie
  const pistesAudio = [];
  for (const piste of combinaison) {
    const cheminFichier = `${repertoire}/${piste}.mp3`;
    pistesAudio.push(new Audio(cheminFichier));
  }

  // Superposer les pistes audio
  const pisteCombinee = document.createElement("audio");
  pisteCombinee.src = URL.createObjectURL(
    new Blob(pistesAudio.map((audio) => audio.src), { type: "audio/mp3" })
  );

  const lienTelechargement = document.createElement("a");
  lienTelechargement.href = pisteCombinee.src;
  lienTelechargement.download = "musique_combinee.mp3";
  lienTelechargement.click();
});
