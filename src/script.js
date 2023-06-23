const socket = new WebSocket('ws://localhost:2023');
let nomc = ''; // Déclarer la variable nomc à l'extérieur de la fonction envoie_nom

socket.onopen = function() {
  console.log('Connecté au serveur WebSocket');
};

socket.onmessage = function(event) {
  const message = document.createElement('div');
  message.textContent = event.data;
  document.getElementById('messages').appendChild(message);
};

document.getElementById('formulaire').addEventListener('submit', function(event) {
  event.preventDefault();
  const message = document.getElementById('message').value;
  const lenom = document.getElementById('nom').value + " : ";
  socket.send(lenom + message);
  document.getElementById('message').value = '';
});

var nom_b = document.getElementById("fond");
var nom_t = document.getElementById("fond2");
nom_b.style.visibility = "visible";
nom_t.style.visibility = "visible";
function envoie_nom() {
  nom_b.style.visibility = "hidden";
  nom_t.style.visibility = "hidden";
  document.getElementById('renom').innerText = document.getElementById('nom').value;
  nomc = document.getElementById('nom').value; // Affecter la valeur à la variable nomc
  socket.send("[+] " + nomc + " a rejoint le tchat");
}

let lastActivityTime = Date.now(); // Enregistrez cette valeur lorsque l'utilisateur se connecte

document.documentElement.addEventListener('mousemove', function() {
  lastActivityTime = Date.now();
});

setInterval(function() {
  const currentTime = Date.now();
  const inactivityThreshold = 30000; // Durée d'inactivité en millisecondes (2 minutes)

  if (currentTime - lastActivityTime > inactivityThreshold) {
    // Utilisateur considéré comme déconnecté
    if (nomc = "") {

    } else {
        socket.send("[-] " + nomc + " a quitté le tchat");
        location.reload();        
    }
  }
}, 10000); // Vérification toutes les 10 secondes
