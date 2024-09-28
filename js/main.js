const file = '../data/productos.json';
const botonFinalizar = document.querySelector("#btnReceta");


botonFinalizar.addEventListener("click", terminarPedido);

/*fetch(file)
  .then(response => response.json())
  .then(data => {
    const productos = data;*/
async function realizarPedido(){
  const productos = await pedido(file);
    // Crear elementos de la lista de productos
    const gridItem = document.querySelectorAll('.grid-item');
    productos.forEach(producto => {
      gridItem.forEach(item =>{
        const li = document.createElement('p');
        const p = document.createElement('p');
        const imagen = document.createElement('img');
        li.textContent = producto.nombre;
        imagen.src=producto.img;
        p.textContent=`Precio: $ ${producto.precio}`;
        const boton = document.createElement('button');
        boton.textContent = 'Agregar al carrito';
        boton.addEventListener('click', () => {
          agregarAlCarrito(producto);
        });
        item.appendChild(li);
        item.appendChild(imagen);
        item.appendChild(p);
        item.appendChild(boton);
      });
    });
  /*});*/
}
// Carrito de compras
const carrito = [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarrito();
}

function mostrarCarrito() {
  const divCarrito = document.getElementById('carrito');
  divCarrito.innerHTML = "";
  let totalCompra = 0;
  carrito.forEach(producto => {
    const p = document.createElement('p');
    p.textContent = `${producto.nombre} - Eliminar`;
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'x';
    botonEliminar.style.width = '10%';
    botonEliminar.style.margin = '5px';
    botonEliminar.addEventListener('click', () => {
      eliminar(producto);
    });
    totalCompra = totalCompra+producto.precio;
    p.appendChild(botonEliminar);
    divCarrito.appendChild(p);
  });
  const compraTotal = document.createElement('p');
  compraTotal.textContent = `Total: $${totalCompra}`;
  divCarrito.appendChild(compraTotal);
}

function eliminar(producto){
  const indice = carrito.indexOf(producto);
  if(indice!==-1){
    carrito.splice(indice,1);
    mostrarCarrito();
  }
}

async function pedido(datos){
  try{
    const response = await fetch(datos);
    if(!response.ok){
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }catch (error){
    console.error(error);
  }
}


realizarPedido();

function terminarPedido(event) {
  event.preventDefault();
  Swal.fire("Gracias por tu pedido estaremos enviandolo a tu dirección en los proximos minutos");
 
}