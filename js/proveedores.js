class Producto {
  constructor(id, nombreP, marca, precio) {
    this.id = id;
    this.nombreP = nombreP;
    this.marca = marca;
    this.precio = precio;
  }
  compa() {
    return `${this.nombreP}${this.marca}`;
  }
}

//Genero la variable que almacenaran los turnos

let productos = [];
const fragment = document.createDocumentFragment();
const tabla_productos = document.getElementById("tabla-productos");

let producto_uno = new Producto(1, "Cera", "Gran Bastardo", 700);
let producto_dos = new Producto(2, "Cera", "Mr Blonde", 850);
let producto_tres = new Producto(3, "Texturizador", "Mr Blonde", 1200);
let producto_cuatro = new Producto(4, "Texturizador", "Yilho", 1000);
let producto_cinco = new Producto(5, "Shampoo(bidon)", "Opcion", 1500);
let producto_seis = new Producto(6, "Shampoo(bidon)", "Sulkey", 1900);
let producto_siete = new Producto(7, "Filos", "Gillete", 2700);
let producto_ocho = new Producto(8, "Filos", "ELIOS", 3000);
let producto_nueve = new Producto(9, "Filos", "Super Max", 2450);

export default Producto;

document.addEventListener("DOMContentLoaded", () => {
  inicial();
});

function inicial() {
  if (localStorage.getItem("productos")) {
    let aux = JSON.parse(localStorage.getItem("productos"));

    for (let i = 0; i < aux.length; i++) {
      sumarALista(aux[i], productos);
    }
  } else {
    productos.push(
      producto_uno,
      producto_dos,
      producto_tres,
      producto_cuatro,
      producto_cinco,
      producto_seis,
      producto_siete,
      producto_ocho,
      producto_nueve
    );

    cargar_productos();
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}

function cargar_productos() {
  tabla_productos.innerHTML = "";
  productos.forEach((element) => {
    let contenido = `
            <tr>
                      <th scope="row">${element.id}</th>
                      <td>${element.nombreP}</td>
                      <td>${element.marca}</td>
                      <td>${element.precio}</td>
                      
                      
             </tr>       


         
      `;
    tabla_productos.innerHTML += contenido;
  });
}

let btn_agregarP = document.getElementById("btn_agregarP");

let auxInicial = 0;
function sumarALista(prod, productos) {
  let acum = 0;
  productos.forEach((element) => {
    if (prod.id === element.id) {
      acum++;
    }
  });
  if (acum !== 1) {
    productos.push(prod);
    cargar_productos();
    if (auxInicial > productos.length) {
      Swal.fire({
        title: "Carga completa",
        text: "Ya se pudo cargar el producto",
        icon: "success",
      });
    }
  } else {
    Swal.fire({
      title: "Falla",
      text: "No se puede cargar el producto",
      icon: "warning",
    });
  }
  auxInicial++;
  localStorage.setItem("productos", JSON.stringify(productos));
}

btn_agregarP.addEventListener("click", () => {
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let marca = document.getElementById("marca").value;
  let precio = document.getElementById("precio").value;
  let prod = new Producto(id, nombre, marca, precio);

  sumarALista(prod, productos);
});

function buscar_producto(nombre_p, marca_p) {
  let aux = `${nombre_p}${marca_p}`;
  let producto = productos.find(
    (p) => `${p.nombreP}${p.marca}`.toLowerCase() === aux.toLowerCase()
  );
  if (producto != null) {
    Swal.fire({
      title: "Producto",
      text: `${producto.id}
      ${producto.nombreP}
      ${producto.marca}
      ${producto.precio}`,
      icon: "success",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "No se encontro el producto",
      text: "Pruebe cargando nuevamente",
    });
  }
}

let btn_producto = document.getElementById("btn_producto");

btn_producto.addEventListener("click", () => {
  let n = document.getElementById("nombre").value;
  let m = document.getElementById("marca").value;

  buscar_producto(n, m);
});
