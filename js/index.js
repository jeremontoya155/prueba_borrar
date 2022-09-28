//Cambiar el modo de la pantalla a modo oscuro o no
let btnDark = document.getElementById("boton_dark");
let btnWhite = document.getElementById("boton_white");

//Dejamos agregado en la configuracion si tiene o no
//el modo oscuro
let modo;
function cambioColor() {
  if (localStorage.getItem("modoOscuro")) {
    modo = localStorage.getItem("modoOscuro");
  } else {
    localStorage.setItem("modoOscuro", false);
  }
  if (modo === "true") {
    document.body.classList.remove("whiteMode");
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
    document.body.classList.add("whiteMode");
  }
}

btnDark.addEventListener("click", () => {
  localStorage.setItem("modoOscuro", true);

  console.log("Funcion Oscura");
  cambioColor();
});

btnWhite.addEventListener("click", () => {
  localStorage.setItem("modoOscuro", false);
  console.log("Funcion Clara");
  cambioColor();
});

//Indico que se debe cargar cuando recargamos la pagina lo que tengamos en nuestra tabla de productos
//De esta manera la cargar un producto podemos hacer que se cargue directametne desde el array
document.addEventListener("DOMContentLoaded", () => {
  cambioColor();
});

//Si queremos envair los productos primero debemos pasarlos a un JSON

//-------------------------
//Damos pie a todas las funciones, en cada una sigue el orden de
//ACCION auxiliar
//Llamada al boton
//agregamos accion al boton
