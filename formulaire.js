

/* Vérification globale du formulaire */
document.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault(); // Annule l'envoi du formulaire
    // On vérifie tous les champs
    const messageOK = checkMessage();
    const sujetOK = checkSujet();
    const mailOK = checkMail();
    if (messageOK && sujetOK && mailOK) {
        alert("Votre formulaire est juste. Le message a été envoyé. Merci de votre intérêt !");
    } else {
        alert("Votre formulaire est faux !");
    }
    console.log(mail.value, message.value, sujet.value);
});

/* Vérification de chaque contrôle à la frappe */
document.getElementById("mail").addEventListener("keyup", checkMail);
document.getElementById("com").addEventListener("keypress", checkMessage);
document.getElementById("sujet").addEventListener("keyup", checkSujet);

/* Les fonctions de vérification */

function checkMail() { //vérifie que le mail est bien rempli
    const mail = document.getElementById("mail");
    const val = mail.value;
    if (
        val.length >= 1 //la longueur du mail doit dépasser un caractère et comprendre les caractères ci-dessous
        && val.match(/[@]/g) !== null
        && val.match(/[a-z]/g) !== null
        && val.match(/[.]/g) !== null
    ) {
        mail.nextElementSibling.classList.remove("show"); // si la condition est remplie le message d'erreur ne s'affiche pas
        return true; // retourne un booléen pour permettre la vérification du formulaire et l'acceptation de son envoi ou non
    } 
    else {
        mail.nextElementSibling.classList.add("show");// si la condition n'est pas remplie, le message d'erreur s'affiche
        return false;
    } 
}

function checkSujet() { //vérifie que le sujet est rempli
    const sujet = document.getElementById("sujet");
    const val = sujet.value;
    if (
        val.length >= 1
        && val.match(/[a-z]/g) !== null
        || val.match(/[A-Z]/g) !== null
    ) {
        return true; // ici pas de message d'erreur juste le booléen pour la vérification
    } else {
        return false;
    }
}

function checkMessage() { //même principe que l'email mais appliqué au message contenu dans le textarea
    const message = document.getElementById("com");
    const value = message.value.trim(); 
    if (value.length > 1000) {
        message.nextElementSibling.classList.add("show");
        return false;}
    else {
        message.nextElementSibling.classList.remove("show")
        return true
    }
    
}