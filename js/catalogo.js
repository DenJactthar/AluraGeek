const listaDeProductos = () => {
    return fetch("http://localhost:3001/productos")
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
  };
  
  const crearProducto = (nombre, precio, imagen) => {
    return fetch("http://localhost:3001/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
        })
    })
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
  }
  
  const borrarProducto = (id) => {
    return fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
  }
  
  export const catalogoProductos = {
    listaDeProductos,
    crearProducto,
    borrarProducto,
  };