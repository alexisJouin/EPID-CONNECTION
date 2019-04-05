$(document).ready(function() {

  /*
   *** TEST ***
   */
  //console.log(zones);
  $.each(zones, function(index, data) {
    console.log(index + " : " + data.titre);
    // console.log(data.points);
    // console.log(data.points.pointA.longitude);
    // console.log(data.points.pointB.latitude);
  });
  // console.log("TEST gare : " + isInsidePolygon(gare, X));



  //Récupération de l'élément html video
  var video = document.getElementById('video');
  //Création de l'élément html pour la "future" source de la vidéo
  var source = document.createElement('source');

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

  //Fonction Si le GPS fonctionne
  function success(pos) {
    //console.log(pos);
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
      longitude: c_latitude,
      latitude: c_longitude
    };

    console.log(tab_currentPostion); //Affichage dans la console

    testMatchingZone(tab_currentPostion); //Test zone

  }

  //Fonction erreur si le GPS ne fonctionne pas
  function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }

  /*TEST SI ON EST DANS LA ZONE définit par les points définits dans zones.js*/
  function testMatchingZone(tab_currentPostion) {

    $.each(zones, function(index, data) {
      if (isInsidePolygon(data.points, tab_currentPostion)) {
        console.log("dans la " + index);
        console.log(data.titre);
        if (zone == data.titre) { //SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          countByZone++;
          if (!video.playing) {
            video.play();
          }
        } else { //SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = data.titre;
          setVideo(data.video);
          console.log("VIDEO" + data.video)
          countByZone++;
        }
        CountMatching++;
        $('#' + data.titre).html(countByZone);
      }
    });

    /*
    var res1 = isInsidePolygon(home, tab_currentPostion);
    var res2 = isInsidePolygon(epid, tab_currentPostion);
    var res3 = isInsidePolygon(gare, tab_currentPostion);
    var res4 = isInsidePolygon(poleMarine, tab_currentPostion);
    */

    /*
    switch (true) {
      case res1: //DOMICILE (PAUL VERLEY)
        if (zone == "domicile") { //SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          if (!video.playing) {
            video.play();
          }
        } else { //SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = "domicile";
          setVideo(zone);
        }
        CountMatching++;
        CountMatchingDomicile++;
        $("#CountMatchingDomicile").html(CountMatchingDomicile);
        console.log("MATCHING Domicile :  " + CountMatchingDomicile);
        break;
      case res2: //EPID
        if (zone == "epid") { //SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          if (!video.playing) {
            video.play();
          }
        } else { //SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = "epid";
          setVideo(zone);
        }
        CountMatching++;
        CountMatchingEPID++;
        $("#CountMatchingEPID").html(CountMatchingEPID);
        console.log("MATCHING EPID :  " + CountMatchingEPID);
        break;

      case res3: //Gare
        if (zone == "gare") { //SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          if (!video.playing) {
            video.play();
          }
        } else { //SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = "gare";
          setVideo(zone);
        }
        CountMatching++;
        CountMatchingGare++;
        $("#CountMatchingGare").html(CountMatchingGare);
        console.log("MATCHING gare :  " + CountMatchingGare);
        break;
      case res4: //Pole Marine
        if (zone == "poleMarine") { //SI TOUJOURS DANS LA MEME ZONE
          alwaysSameZone = true;
          if (!video.playing) {
            video.play();
          }
        } else { //SI on arrive la 1ère fois dans la zone
          alwaysSameZone = false;
          zone = "poleMarine";
          setVideo(zone);
        }
        CountMatching++;
        CountMatchingPoleMarine++;
        $("#CountMatchingPoleMarine").html(CountMatchingPoleMarine);
        console.log("MATCHING Pole Marine :  " + CountMatchingPoleMarine);
        break;
    }
    */
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
      source.setAttribute('src', 'medias/videos/' + nom);
      video.appendChild(source);
      video.play();

      // if (video.requestFullscreen) {
      //   video.requestFullscreen();
      // }
    }

  }

});
