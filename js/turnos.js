//Constructors para las clases utilizadas
//const Swal = require("sweetalert2");
// CommonJS

class Turno {
  constructor(dia, nombre, horario) {
    this.dia = dia;
    this.nombre = nombre;
    this.horario = horario;
  }

  comp() {
    return `${this.dia}${this.horario}`;
  }
}

let turnos = [];
let aux;
document.addEventListener("DOMContentLoaded", () => {
  inicial();
});

function inicial() {
  if (localStorage.getItem("Turnos")) {
    aux = JSON.parse(localStorage.getItem("Turnos"));

    for (let i = 0; i < aux.length; i++) {
      auxCarga(aux[i]);
    }
  }
}

function cargarTurnos() {
  let nombre = document.getElementById("nombre");
  let dia = document.getElementById("dia");
  let hora = document.getElementById("hora");

  let turn;
  if (nombre.value != "" && dia.value != "" && hora.value != "") {
    turn = new Turno(dia.value, nombre.value, hora.value);
  } else {
    turn = new Turno("nan", "nan", "nan");
  }
  return turn;
}

function agregar_tabla(turno) {
  let espacio = document.getElementById("agregar_contenido");
  let agregado = `<tr id="${turno.dia}-${turno.horario}">
    <td >${turno.nombre}</td>
    <td>${turno.dia}</td>
    <td>${turno.horario}</td>
    </tr>`;
  espacio.innerHTML += agregado;
}

let auxInicial = 0;
function auxCarga(turno) {
  let ban = true;

  let comparador = `${turno.dia}${turno.horario}`;
  for (let t of turnos) {
    let comparadorAux = `${t.dia}${t.horario}`;
    if (comparadorAux == comparador) {
      ban = false;
    }
  }

  if (ban) {
    if (turno.nombre == "nan") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puede cargar un turno vacio",
      });
    } else {
      turnos.push(turno);

      localStorage.setItem("Turnos", JSON.stringify(turnos));
      agregar_tabla(turno);
      auxInicial++;
    }

    if (auxInicial > turnos.length) {
      confirmo();
    }
  } else {
    ocupado();
  }
}

let btnCarga = document.getElementById("btn_cargar");
function confirmo() {
  Swal.fire({
    title: "Confirmo turno",
    text: "Agendado correctamente",
    icon: "success",
  });
}

function ocupado() {
  Swal.fire({
    title: "Aviso",
    text: "Turno ocupado o realizo cancelacion",
    icon: "warning",
  });
}

btnCarga.addEventListener("click", () => {
  let turno = cargarTurnos();
  auxCarga(turno);
});

function buscar(nom) {
  let resultado = turnos.find((tur) => tur.nombre === nom);
  return resultado;
}

let busqueda_nombre = document.getElementById("btn_nombre");

function avisoNombre(valor, valorDos, valorTres) {
  Swal.fire({
    title: "Turno",
    text: `La persona ${valor} tiene el siguiente turno 
    Dia:${valorDos} Hora:${valorTres}`,
  });
}

busqueda_nombre.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let devolucion = buscar(n.value);

  if (devolucion != null) {
    avisoNombre(devolucion.nombre, devolucion.dia, devolucion.horario);
  } else {
    Swal.fire({
      title: "No tiene un turno asignado",
      text: "Ingrese nuevamente un nombre para confirmar",
    });
  }
});

function eliminar(salida) {
  if (salida.nombre != null) {
    let indice = turnos.indexOf(salida);
    turnos.splice(indice, 1);
    localStorage.removeItem("Turnos");
    localStorage.setItem("Turnos", JSON.stringify(turnos));
    Swal.fire({
      text: "Se encontro el turno buscado",
      icon: "success",
    });
    let id_eliminar = salida.dia + "-" + salida.horario;
    let espacio_eliminado = document.getElementById(id_eliminar);
    espacio_eliminado.outerHTML = "";
    inicial();
  } else {
    Swal.fire({
      text: "No se encontro el turno ingresado",
      icon: "error",
    });
  }
}

let btn_eliminar = document.getElementById("btn_eliminar");
btn_eliminar.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let salida = buscar(n.value);

  if (salida != null) {
    eliminar(salida);
  } else {
    Swal.fire({
      title: "Error",
      text: "Caso fallido no se encontro a la persona",
      icon: "error",
    });
  }
});
