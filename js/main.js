import { catalogoProductos } from "./catalogo.js";

const containerProducto = document.querySelector("[data-producto]");
const formulario = document.querySelector("[data-form]");

function crearElemento(nombre, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="imagen-container">
            <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="card-container__informacion">
            <p>${nombre}</p>
        <div class="card-container__precio">
            <p>$${precio}</p>
            <button class="boton-excluir" data-id="${id}">
                <img src= "/imagenes/iconoBote.png" alt="bote basura">
            </button>    
        </div>
        </div>
    `

    containerProducto.appendChild(card);
    return card;
}

const render = async () => {
    try{
        const listaProductos = await catalogoProductos.listaDeProductos();
        
        listaProductos.forEach(produto => {
            containerProducto.appendChild(
                crearElemento(
                    produto.nombre,
                    produto.precio,
                    produto.imagen,
                    produto.id
                )
            )
        });

    } catch(error) {
        console.log(error);
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    catalogoProductos.crearProducto(nombre, precio, imagen)
    .then((resposta) => console.log(resposta))
    .catch((erro) => console.log(erro));
});

containerProducto.addEventListener("click", async (evento) => {
    if (evento.target.classList.contains("boton-excluir") || evento.target.closest(".boton-excluir")) {
        const botonExcluir = evento.target.closest(".boton-excluir");
        const id = botonExcluir.dataset.id;
        try {
            await catalogoProductos.borrarProducto(id);
            botonExcluir.closest(".card").remove();
        } catch (erro) {
            console.log(erro);
        }
    }
});

render();