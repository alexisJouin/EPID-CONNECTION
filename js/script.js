$(document).ready(function() {



  //Récupération de l'élément html video
  var video = document.getElementById('video');
  var source = document.createElement('source');

  var testButton1 = $('#testButton1');
  var testButton2 = $('#testButton2');
  var testButton3 = $('#testButton3');
  var startButton = $('#startButton');
  var listInfos = $('#mapTest');
  var currentPostion = $('#currentPostion');

  var alwaysSameZone = false;
  var zone = "nowhere";
  var testCpt = 0;


  //Start Location
  startButton.click(function() {
    $('h2').show(500);
    navigator.geolocation.watchPosition(success, error, options);
    startButton.hide(500);
    toggleFullScreen(document.body);
  });

  //Event Test 1
  testButton1.click(function() {
    setVideo("domicile");
  });
  //Event Test 2
  testButton2.click(function() {
    setVideo("tribut");
  });
  //Event Test 3
  testButton3.click(function() {
    setVideo("video2-test")
  });


  //Fonction Si le GPS fonctionne
  function success(pos) {
    console.log(pos);
    var crd = pos.coords;
    CountDeplacement++;

    //Affichage dans la console du navigateur
    console.log('Nb changement position :' + CountDeplacement);
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);

    // //Affichage dans la page WEB
    currentPostion.html('<br><u>Votre position actuelle est </u>:');
    currentPostion.append("<br>Itération :  " + CountDeplacement);
    currentPostion.append("<br><b>Itération Matching :  " + CountMatching + "</b>");
    currentPostion.append(`<br>Latitude : <b>${crd.latitude}</b>`);
    currentPostion.append(`<br>Longitude : <b>${crd.longitude}</b>`);
    currentPostion.append(`<br>La précision est de ${crd.accuracy} mètres.`);

    //Arrondir à 0.000001
    var c_latitude = Math.round(crd.latitude * 1000000) / 1000000;
    var c_longitude = Math.round(crd.longitude * 1000000) / 1000000;

    //Tableau de la position courrante
    var tab_currentPostion = {
      x: c_latitude,
      y: c_longitude
    };

    console.log(tab_currentPostion); //Affichage dans la console

    testMatchingZone(tab_currentPostion);

  }

  //Fonction erreur si le GPS ne fonctionne pas
  function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }

  /*TEST SI ON EST DANS LA ZONE définit par les points définits*/
  function testMatchingZone(tab_currentPostion) {

    var res1 = isInsidePolygon(home, tab_currentPostion);
    var res2 = isInsidePolygon(epid, tab_currentPostion);
    switch (true) {
      case res1: //DOMICILE (PAUL VERLEY)
        if (zone == "domicile") {//SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          if(!video.playing){
            video.play();
          }
        } else {//SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = "domicile";
          setVideo(zone);
          testCpt++;
        }
        CountMatching++;
        CountMatchingDomicile++;
        $("#CountMatchingDomicile").html(CountMatchingDomicile);
        console.log("Matching with coords (" + CountMatching + ")");
        console.log("MATCHING Domicile :  " + CountMatchingDomicile);
        console.log("TESTe :  " + testCpt);

        break;
      case res2: //Stade Tribut
        CountMatching++;
        CountMatchingTribut++;
        $("#CountMatchingTribut").html(CountMatchingTribut);
        console.log("Matching with coords (" + CountMatching + ")");
        console.log("MATCHING Tribut :  " + CountMatchingTribut);
        setVideo("tribut");
        break;
    }
  };

  //Clean video avant de lancer la nouvelle vidéo
  function cleanVideo() {
    video.pause();
    video.removeAttribute('src'); // empty source
    video.load();
  }

  //initialise et lance la vidéo en fullScreen
  function setVideo(nom) {
    console.log(video.currentSrc);
    if (!video.playing) { //Si la vidéo n'a pas encore démarrée OU STOP
      cleanVideo();
      $('video').show(200);
      source.setAttribute('src', 'medias/videos/' + nom + '-video.mp4');
      video.appendChild(source);
      video.play();

      // if (video.requestFullscreen) {
      //   video.requestFullscreen();
      // }
    }

  }

});
