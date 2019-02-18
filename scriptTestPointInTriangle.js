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
function isInsideTriangle(A, B, C, H) {
  var result = false;
  if (isLeft(C, A, H) * isLeft(C, A, B) > 0 &&
    isLeft(A, B, H) * isLeft(A, B, C) > 0 &&
    isLeft(C, B, H) * isLeft(C, B, A) > 0) {
    result = true;
  }
  return result;
};

var a = {
  x: 2,
  y: 2
};
var b = {
  x: 5,
  y: 3
};
var c = {
  x: 3.5,
  y: 7
};
var X = {
  x: 1,
  y: 1
};

var res = isInsideTriangle(a, b, c, X);
if (res) {
  console.log("Le point X(" + X.x + ";" + X.y + ") est dans le triangle ABC :)")
} else {
  console.log("Le point X(" + X.x + ";" + X.y + ") n'est pas dans le triangle ABC :'( ")
}
