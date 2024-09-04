
const boton = document.querySelector("#btnReceta");
const listaDeCompras = document.getElementById('lista');
const receta = [];

boton.addEventListener("click", agregarReceta);



function cargarIngredientes() {
    const items = JSON.parse(localStorage.getItem('lista')) || [];
    items.forEach(item => agregarIngLocalStorage(item));
}

function agregarIngLocalStorage(listaDeIngredientes) {
    const li = document.createElement('li');
    li.textContent = listaDeIngredientes;

    const eliminar = document.createElement('button');
    eliminar.textContent = 'Eliminar';
    eliminar.className = 'eliminar';
    eliminar.addEventListener('click', () => {
        listaDeCompras.removeChild(li);
        guardarLocalStorage(); 
    });

    li.appendChild(eliminar);
    listaDeCompras.appendChild(li);
}
debugger
function guardarLocalStorage() {
    const items = Array.from(listaDeCompras.children).map(li => li.firstChild.textContent);
    localStorage.setItem('lista', JSON.stringify(items));
}


function agregarReceta(event) {
    event.preventDefault();
    const nombreReceta = document.getElementById('nomReceta').value.trim();
    const ingrediente = document.getElementById('ingredientes').value.trim();

    if (!nombreReceta || !ingrediente) {
        alert('Por favor, ingresa el nombre de la receta y los ingredientes.');
        return;
    }


    const listaDeIngredientes = ingrediente.split(',').map(ingrediente => ingrediente.trim().toLowerCase());


    receta.push({ nombre: nombreReceta, ingrediente: listaDeIngredientes });


    document.getElementById('nomReceta').value = '';
    document.getElementById('ingredientes').value = '';


    agregarIngLocalStorage(listaDeIngredientes);
    guardarLocalStorage(); 
    actualizarListado();
}

function actualizarListado() {
    const listaDeCompras = document.getElementById('lista');
    listaDeCompras.innerHTML = '';


    const conteoIngredientes = {};


    receta.forEach(rec => {
        rec.ingrediente.forEach(ingrediente => {
            if (conteoIngredientes[ingrediente]) {
                conteoIngredientes[ingrediente]++;
            } else {
                conteoIngredientes[ingrediente] = 1;
            }
        });
    });

    for (const [ingrediente, cont] of Object.entries(conteoIngredientes)) {
        const li = document.createElement('li');
        li.textContent = `${ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1)} (${cont})`;
        listaDeCompras.append(li);
    }
}


cargarIngredientes();
