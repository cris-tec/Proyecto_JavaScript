// script.js
const boton = document.querySelector("#btnReceta");
const receta = [];

boton.addEventListener("click", agregarReceta);


function agregarReceta(event) {
    event.preventDefault();
    const nombreReceta = document.getElementById('nomReceta').value.trim();
    const ingrediente = document.getElementById('ingredientes').value.trim();

    if (!nombreReceta || !ingrediente) {
        alert('Por favor, ingresa el nombre de la receta y los ingredientes.');
        return;
    }

    // Separar ingredientes por coma y eliminar espacios extra
    const listaDeIngredientes = ingrediente.split(',').map(ingrediente => ingrediente.trim().toLowerCase());

    // Agregar la receta al array de recetas
    receta.push({ nombre: nombreReceta, ingrediente: listaDeIngredientes });

    // Limpiar los campos de entrada
    document.getElementById('nomReceta').value = '';
    document.getElementById('ingredientes').value = '';

    // Actualizar la lista de compras
    actualizarListado();
}

function actualizarListado() {
    const listaDeCompras = document.getElementById('lista');
    listaDeCompras.innerHTML = '';

    // Crear un objeto para contar las ocurrencias de cada ingrediente
    const conteoIngredientes = {};

    // Contar ingredientes
    receta.forEach(rec => {
        rec.ingrediente.forEach(ingrediente => {
            if (conteoIngredientes[ingrediente]) {
                conteoIngredientes[ingrediente]++;
            } else {
                conteoIngredientes[ingrediente] = 1;
            }
        });
    });

    // Mostrar los ingredientes y sus cantidades

    for (const [ingrediente, cont] of Object.entries(conteoIngredientes)) {
        const li = document.createElement('li');
        li.textContent = `${ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1)} (${cont})`;
        listaDeCompras.append(li);
    }
}
