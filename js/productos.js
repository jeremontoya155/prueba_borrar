class Producto {
  constructor(id, nombreP, marca, precio, imagen) {
    this.id = id;
    this.nombreP = nombreP;
    this.marca = marca;
    this.precio = precio;
    this.imagen = imagen;
  }
  compa() {
    return `${this.nombreP}${this.marca}`;
  }
  muestreo() {
    Swal.fire({
      title: "Producto",
      text: `${this.id}
        ${this.nombreP}
        ${this.marca}
        ${this.precio}`,
    });
  }
}

let productos = [];

let producto_uno = new Producto(
  1,
  "Cera",
  "Gran Bastardo",
  700,
  "../images/cera_granBastardo.png"
);
let producto_dos = new Producto(
  2,
  "Cera",
  "Mr Blonde",
  850,
  "../images/cera_mrblonde.png"
);
let producto_tres = new Producto(
  3,
  "Texturizador",
  "Mr Blonde",
  1200,
  "../images/texturizadorYilho.png"
);
let producto_cuatro = new Producto(
  4,
  "Texturizador",
  "Yilho",
  1000,
  "../images/texturizador_mrBlonde.png"
);
let producto_cinco = new Producto(
  5,
  "Shampoo(bidon)",
  "Opcion",
  1500,
  "../images/shampoOpcion.png"
);
let producto_seis = new Producto(
  6,
  "Shampoo(bidon)",
  "Sulkey",
  1900,
  "../images/silkeyShampoo.png"
);
let producto_siete = new Producto(
  7,
  "Filos",
  "Gillete",
  2700,
  "../images/filo_gillete.png"
);
let producto_ocho = new Producto(
  8,
  "Filos",
  "ELIOS",
  3000,
  "../images/filosElios.png"
);
let producto_nueve = new Producto(
  9,
  "Filos",
  "Super Max",
  2450,
  "../images/filosSupermax.png"
);

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

let carrito = [];
let tabla_productos = document.getElementById("tabla-productos");
document.addEventListener("DOMContentLoaded", () => {
  cargar();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(carrito);
    pintarCarrito(carrito);
  }
});
let botones = [];

let rellenar = document.getElementById("completar_productos");
function cargar() {
  let btn_agregado;
  rellenar.innerHTML = "";
  productos.forEach((producto) => {
    let texto = document.createElement("div");
    texto = `<div class="col-12 mb-2 col-md-4  ">
    <div class="card border-secondary card-border-radius ">
      <div class="card-body centrar ">
        <img src="${producto.imagen}" alt="${producto.nombreP}" class="card-img-top ajustar " />
        
        <h5 >${producto.nombreP}</h5>
        <h6>${producto.marca}</h6>
        <p>${producto.precio}</p>
        
        <button class="btn btn-dark btn-compra" id="btnC${producto.id}">Comprar</button>
      </div>
    </div>
  </div>`;

    rellenar.innerHTML += texto;
    btn_agregado = document.getElementById(`btnC${producto.id}`);
    btn_agregado.addEventListener("click", () => {
      // Swal.fire({
      //   title: `Compra producto ${producto.nombreP}`,
      //   text: "Confirma la compra?",
      //   icon: "success",
      // });
      console.log("Se agrega producto");
    });
  });
}

function pintarCarrito() {
  tabla_productos.innerHTML = "";
  carrito.forEach((element) => {
    let contenido = `
            <tr>
                      <th scope="row">${element.id}</th>
                      <td>${element.nombreP}</td>
                      <td>${element.marca}</td>
                      <td>${element.precio}</td>
                      <td>
                      <button class="btn btn-success"></button>
                      <button class="btn btn-warning"></button></td>
                      
                      
                      
             </tr>       
         
      `;
    tabla_productos.innerHTML += contenido;
  });
  localStorage.setItem("carrito", carrito);
}

