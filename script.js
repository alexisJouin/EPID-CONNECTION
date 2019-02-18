$(document).ready(function() {

  //Tableau des points test
  var tab_coord = [{
      name: "Point A",
      latitude: 51.034508, //Au feu rouge 110e régiment
      longitude: 2.386078
    },
    {
      name: "Point B",
      latitude: 51.024045, // Au carrefour pour aller à gauche à cora à droite vers l'EPID
      longitude: 2.375532
    },
    {
      name: "CORA",
      latitude: 51.016328, //CORA
      longitude: 2.379056
    },
    {
      name: "Point C",
      latitude: 51.040706,
      longitude: 2.388800
    },
    {
      name: "Point D",
      latitude : 51.040697,
      longitude : 2.388865
    }
  ];

  //Variables globales
  var testButton = $('#testButton');
  var startButton = $('#startButton');
  var listInfos = $('#mapTest');
  var currentPostion = $('#currentPostion');
  var CountDeplacement = 0;
  var CountMatching = 0;

  //Option GPS
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  //Fonction Si le GPS fonctionne
  function success(pos) {
    var crd = pos.coords;
    CountDeplacement++;

    //Affichage dans la console du navigateur
    console.log('Nb changement position :' + CountDeplacement);
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);


    //Affichage dans la page WEB
    currentPostion.html('<br><u>Votre position actuelle est </u>:');
    currentPostion.append("<br>Itération :  " + CountDeplacement);
    currentPostion.append("<br><b>Itération Matching :  " + CountMatching + "</b>");
    currentPostion.append(`<br>Latitude : <b>${crd.latitude}</b>`);
    currentPostion.append(`<br>Longitude : <b>${crd.longitude}</b>`);
    currentPostion.append(`<br>La précision est de ${crd.accuracy} mètres.`);

    //Arrondir à 0.0000001
    var c_latitude = Math.round(crd.latitude * 1000000) / 1000000;
    var c_longitude = Math.round(crd.longitude * 1000000) / 1000000;

    //Tableau de la position courrante
    var tab_currentPostion = {
      name: "current_position",
      latitude: c_latitude,
      longitude: c_longitude
    };

    console.log(tab_currentPostion); //Affichage dans la console


    //Test EVENT quand la position actuelle correspond aux points définits
    tab_coord.forEach(function(coord) {
      if (coord.longitude == tab_currentPostion.longitude &&
        coord.latitude == tab_currentPostion.latitude) {
        CountMatching++;
        console.log("Matching with coords (" + CountMatching + ")");
        currentPostion.append("<br><b>MATCHING :  " + CountMatching + "</b>");
      }
    });
  }

  //Fonction erreur si le GPS ne fonctionne pas
  function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }

  //Event Test
  testButton.click(function() {
    currentPostion.append("<br><p>Lancement de la vidéo ... </p></br>");
    var video = document.getElementById('video-test');
    video.play();
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }

  });

  //Start Location
  startButton.click(function() {
    $('h2').show(500);
    navigator.geolocation.watchPosition(success, error, options);
    startButton.hide(500);
  });






});





//OLD VERSION ...
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    listInfos.html("<p>Geolocation non supportée par le navigateur.</p>");
  }
}

function showPosition(position) {
  listInfos.append("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}
