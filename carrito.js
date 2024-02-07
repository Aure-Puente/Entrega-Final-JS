document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones "Agregar al carrito"
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    // Obtener la lista del carrito y el elemento que muestra el total
    const listaCarrito = document.getElementById('cart-list');
    const elementoTotal = document.getElementById('total');
    let total = 0; // Inicializar el total del carrito

    // Manejador de eventos para los botones "Agregar al carrito"
    botonesAgregarCarrito.forEach(function(boton) {
        boton.addEventListener('click', function(evento) {
            evento.preventDefault(); // Prevenir el comportamiento predeterminado del clic

            // Obtener el nombre y el precio del producto
            const nombre = boton.getAttribute('data-name');
            const precio = parseInt(boton.getAttribute('data-price'));
            agregarItemAlCarrito(nombre, precio); // Llamar a la función para agregar el artículo al carrito
            Toastify({
                text: `Se agregó "${nombre}" al carrito`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        });
    });

    // Función para agregar un artículo al carrito
    function agregarItemAlCarrito(nombre, precio) {
        // Obtener los productos del localStorage o un array vacío si no hay ninguno
        let productos = JSON.parse(localStorage.getItem('cartProducts')) || [];
        let encontrado = false; // Variable para indicar si el producto ya está en el carrito
        // Recorrer el array de productos
        for (let i = 0; i < productos.length; i++) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            if (productos[i].nombre === nombre) {
                productos[i].cantidad++;
                encontrado = true;
                break; // Salir del bucle una vez encontrado el producto
            }
        }
        // Si el producto no estaba en el carrito, añadirlo
        if (!encontrado) {
            productos.push({ nombre, precio, cantidad: 1 }); // Añadir el producto al array de productos
        }
        
        localStorage.setItem('cartProducts', JSON.stringify(productos)); // Guardar los productos en localStorage
        
        actualizarVistaCarrito(productos); // Actualizar la vista del carrito
    }

    // Función para actualizar la vista del carrito
    function actualizarVistaCarrito(productos) {
        listaCarrito.innerHTML = ''; // Limpiar la lista del carrito
        total = 0; // Reiniciar el total del carrito
        // Recorrer los productos del carrito
        productos.forEach(function(producto) {
            const li = document.createElement('li'); // Crear un elemento de lista para el producto
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}
                <button class="btn btn-sm btn-success btn-sumar" data-name="${producto.nombre}">+</button> <!-- Botón para sumar cantidad -->
                <button class="btn btn-sm btn-danger btn-restar" data-name="${producto.nombre}">-</button> <!-- Botón para restar cantidad -->
            `;
            listaCarrito.appendChild(li); // Agregar el elemento de lista al carrito
            total += producto.precio * producto.cantidad; // Calcular el nuevo total del carrito
        });
        elementoTotal.textContent = total; // Mostrar el nuevo total del carrito en el elemento correspondiente
    }

    // Manejador de eventos para clics en la página
    document.addEventListener('click', function(evento) {
        if (evento.target.classList.contains('btn-sumar')) {
            // Obtener el nombre del producto del botón
            const nombreProducto = evento.target.getAttribute('data-name');
            // Llamar a la función para sumar uno al producto correspondiente en el carrito
            sumarProducto(nombreProducto);
            Toastify({
                text: `Se aumentó la cantidad de "${nombreProducto}" en el carrito`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        } else if (evento.target.classList.contains('btn-restar')) {
            // Obtener el nombre del producto del botón
            const nombreProducto = evento.target.getAttribute('data-name');
            // Llamar a la función para restar uno al producto correspondiente en el carrito
            restarProducto(nombreProducto);
            Toastify({
                text: `Se redujo la cantidad de "${nombreProducto}" en el carrito`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #9b0029, #c93d5e)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }
    });

    // Función para sumar uno a la cantidad de un producto en el carrito
    function sumarProducto(nombre) {
        // Obtener los productos del localStorage
        let productos = JSON.parse(localStorage.getItem('cartProducts')) || [];
        // Recorrer los productos del carrito
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre === nombre) {
                productos[i].cantidad++; // Sumar uno a la cantidad del producto
                break; // Salir del bucle una vez encontrado el producto
            }
        }
        localStorage.setItem('cartProducts', JSON.stringify(productos)); // Guardar los productos en localStorage
        actualizarVistaCarrito(productos); // Actualizar la vista del carrito
    }

    // Función para restar uno a la cantidad de un producto en el carrito
    function restarProducto(nombre) {
        // Obtener los productos del localStorage
        let productos = JSON.parse(localStorage.getItem('cartProducts')) || [];
        // Recorrer los productos del carrito
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre === nombre) {
                if (productos[i].cantidad > 1) {
                    productos[i].cantidad--; // Restar uno a la cantidad del producto si es mayor que 1
                } else {
                    productos.splice(i, 1); // Eliminar el producto del carrito si la cantidad es 1
                }
                break; // Salir del bucle una vez encontrado el producto
            }
        }
        localStorage.setItem('cartProducts', JSON.stringify(productos)); // Guardar los productos en localStorage
        actualizarVistaCarrito(productos); // Actualizar la vista del carrito
    }

    // Obtener los productos del localStorage al cargar la página y actualizar la vista del carrito
    let productos = JSON.parse(localStorage.getItem('cartProducts')) || [];
    actualizarVistaCarrito(productos);
});

// EVENTO AL BOTÓN COMPRAR UTILIZANDO SEGUNDA LIBRERIA
const botonCompraFinal = document.getElementById("botmerch")
botonCompraFinal.addEventListener("click", ()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Confirmación de compra",
            text: "Si selecciona COMPRAR, se ejecutará el pago automáticamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "COMPRAR",
            cancelButtonText: "CANCELAR",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Compra realizada!",
                text: "Muchas gracias por su compra!",
                icon: "success"
            });
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire({
                title: "CANCELADA",
                text: "Tu compra fue cancelada con éxito",
                icon: "error"
            });
            }
        });
    })