//Affichage de la date sans l'heure au format lun jj/mm

var d = new Date();
var time = d.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
});
var time2 = d.toLocaleDateString('fr-FR', {
    month: '2-digit'
});
date = document.getElementById("date").innerHTML = time + '/' + time2;

//Affichage de l'heure avec actualisation continue
function AfficherHeure() {
    var h = new Date()
    var Hour = h.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    document.getElementById("heure").innerHTML = Hour; //ajoute l'heure à la section dédiée du HTML
}

window.onload = function refresh() {
    setInterval('AfficherHeure()', 1000); //Permet d'actualiser toutes les secondes l'heure sur la page
}

//Récupératio de l'API pour les données météos : lever/coucher soleil, température min/max, météo J J+1 J+2

const uri = "https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235";
fetch(uri) //va chercher les données à l'emplacement indiqué
    .then((meteo) => { //then permet de retourner la promesse
        if (meteo.ok) { //les données collectées sont valides
            return meteo.json(); // promesse d'extirper les données de la réponse
        } else {
            throw new Error(`Données non collectées erreur ${parametre.status} : ${parametre.statusText}`)
        }
    })
    .then((json) => {
        //récupération données lever coucher soleil
        const rise = document.createTextNode(json.city_info.sunrise);
        document.getElementById("lever").appendChild(rise);
        const set = document.createTextNode(json.city_info.sunset);
        document.getElementById("coucher").appendChild(set);

        //récupération données temp min et max
        const tempmin = document.createTextNode(json.fcst_day_0.tmin);
        document.getElementById("Min").appendChild(tempmin);
        const tempmax = document.createTextNode(json.fcst_day_0.tmax);
        document.getElementById("Max").appendChild(tempmax);
        const tempmoy = document.getElementById("Moy");
        tempmoy.textContent += (json.fcst_day_0.tmin + json.fcst_day_0.tmax) / 2 //calcul température moy

        //récupération météo J0 J1 J2
        const auj = document.createTextNode(json.fcst_day_0.condition);
        document.getElementById("j0").appendChild(auj);
        const dem = document.createTextNode(json.fcst_day_1.condition);
        document.getElementById("j1").appendChild(dem);
        const apdm = document.createTextNode(json.fcst_day_2.condition);
        document.getElementById("j2").appendChild(apdm);

        //récupération météo image J0 J1 J2
        const aujim = document.createElement("img");
        aujim.src = json.fcst_day_0.icon;
        document.getElementById("J0").appendChild(aujim);
        const demim = document.createElement("img");
        demim.src = json.fcst_day_1.icon;
        document.getElementById("J1").appendChild(demim);
        const apdmim = document.createElement("img");
        apdmim.src = json.fcst_day_2.icon;
        document.getElementById("J2").appendChild(apdmim);
    })
    .catch((error) => {
        document.querySelector("#lever").textContent =
            `Erreur : un problème réseau est survenu (${error}).`;
    });

//Récupération de saints du jour :
const uri1 = "https://nominis.cef.fr/json/nominis.php";
fetch(uri1) //va chercher les données à l'emplacement indiqué
    .then((resp) => { //then permet de retourner la promesse
        if (resp.ok) { //les données collectées sont valides
            return resp.json(); // promesse d'extirper les données de la réponse
        } else {
            throw new Error(`Données non collectées erreur ${parametre.status} : ${parametre.statusText}`)
        }
    })
    .then((json) => {
        console.log(json)
        let SaintDuJour = Object.keys(json.response.saints.majeurs)
        const saint = document.createTextNode(SaintDuJour[0]);
        document.getElementById("fete").appendChild(saint);
    })
    .catch((error) => {
        console.error(error)
        //     document.querySelector("fete").textContent = 
        //     `Erreur : un problème réseau est survenu (${error}).`;
    });
