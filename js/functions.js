//Variables globales
//Test : points définissant une zone
//Domicile abc
var a1 = {
  x: 51.04132,
  y: 2.38814
};
var b1 = {
  x: 51.04033,
  y: 2.38783
};
var c1 = {
  x: 51.04003,
  y: 2.39016
};
var d1 = {
  x: 51.04137,
  y: 2.3902
};
var home = {
  a: a1,
  b: b1,
  c: c1,
  d: d1
}
//Stade Tribut
// var d = {
//   x: 51.03668,
//   y: 2.38875
// };
// var e = {
//   x: 51.03441,
//   y: 2.38641
// };
// var f = {
//   x: 51.0336,
//   y: 2.39109
// };
// var tribut = {
//   a: d,
//   b: e,
//   c: f
// }


var a2 = {
  x: 51.02741,
  y: 2.37042
};
var b2 = {
  x: 51.02759,
  y: 2.37258
};
var c2 = {
  x: 51.02587,
  y: 2.37325
};
var d2 = {
  x: 51.02577,
  y: 2.37127
};
var epid = {
  a: a2,
  b: b2,
  c: c2,
  d: d2
}



//Point X test
// var X = {
//   x: 51.04154,
//   y: 2.39094
// };



var CountDeplacement = 0;
var CountMatching = 0;
var CountMatchingDomicile = 0;
var CountMatchingTribut = 0;

//Option GPS
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};







/*** Triangulation Simple ***/
/* Teste si point newp est : à Gauche|Sur| à Droite de la droite (p1p2).
// Result: >0 si newp est à gauche de la droite P1-P2
//           =0 si le point est surla droite
//          <0 ... droite
// NB : surface du triangle = Isleft / 2 .
// chaque point défini par ses coordonnées X,Y ...*/
function isLeft(p1, p2, newp) {
  var result = (p2.x - p1.x) * (newp.y - p1.y) - (newp.x - p1.x) * (p2.y - p1.y);
  console.log(result);
  return result;
};

/* Teste si point H est intérieur au Triangle ABC.
// Méthode: Test si H et C sont a gauche de AB,
// ou pas, mais en meme temps*/
// function isInsideTriangle(A, B, C, H) {
//   var result = false;
//   if (isLeft(C, A, H) * isLeft(C, A, B) > 0 &&
//     isLeft(A, B, H) * isLeft(A, B, C) > 0 &&
//     isLeft(C, B, H) * isLeft(C, B, A) > 0) {
//     result = true;
//   }
//   return result;
// };


function isInsidePolygon(points, H) {
  var result = false;
  var A = points.a;
  var B = points.b;
  var C = points.c;
  var D = points.d;

  if (isLeft(B, A, H) * isLeft(C, B, A) >= 0 &&
    isLeft(A, D, H) * isLeft(A, D, C) >= 0 &&
    isLeft(D, C, H) * isLeft(D, C, B) >= 0 &&
    isLeft(C, B, H) * isLeft(C, B, A) >= 0) {
    result = true;
  }
  return result;
};




function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

//Fonction pour déterminer si la vidéo est en lecture ?
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function() {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

Object.defineProperty(HTMLMediaElement.prototype, 'changing', {
  get: function() {

  }
});

//Set Page FullScreen
function toggleFullScreen(elem) {
  // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
