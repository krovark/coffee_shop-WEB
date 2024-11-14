$(document).ready(function() {
    const productos = [
        { id: 1, nombre: "Cafe 1", precio: 19.99 },
        { id: 2, nombre: "Cafe 2", precio: 49.99 },
        { id: 3, nombre: "Cafe 3", precio: 79.99 }
    ];

    let carrito = [];

    const renderizarCarrito = () => {
        const elementosCarrito = $('#cart-items').empty();
        carrito.forEach(item => {
            elementosCarrito.append(`
                <div class="cart-item">
                    <h5>${item.nombre}</h5>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger quitar-del-carrito" data-id="${item.id}">Eliminar</button>
                </div>
            `);
        });
        actualizarTotalCarrito();
    };

    const actualizarTotalCarrito = () => {
        const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        $('#cart-total').text(`$${total.toFixed(2)}`);
        $('#cart-count').text(carrito.reduce((suma, item) => suma + item.cantidad, 0));
    };

    const agregarAlCarrito = (idProducto) => {
        const producto = productos.find(p => p.id === parseInt(idProducto));
        if (!producto) return;
        const itemCarrito = carrito.find(item => item.id === producto.id);
        itemCarrito ? itemCarrito.cantidad++ : carrito.push({ ...producto, cantidad: 1 });
        renderizarCarrito();
        actualizarBotonCarrito();
    };

    const quitarDelCarrito = (idProducto) => {
        carrito = carrito.filter(item => item.id !== parseInt(idProducto));
        renderizarCarrito();
        actualizarBotonCarrito();
    };

    const actualizarBotonCarrito = () => {
        $('#cart-count').text(carrito.reduce((suma, item) => suma + item.cantidad, 0));
    };

    $('#cart-button').on('click', (e) => {
        e.preventDefault();
        $('#cart-sidebar').toggleClass('open');
        $('.cart-overlay').toggleClass('open');
    });

    $('.cart-overlay, #close-cart').on('click', () => {
        $('#cart-sidebar').removeClass('open');
        $('.cart-overlay').removeClass('open');
    });

    $(document).on('click', '.add-to-cart', function() {
        agregarAlCarrito($(this).data('id'));
    });

    $(document).on('click', '.quitar-del-carrito', function() {
        quitarDelCarrito($(this).data('id'));
    });

    $('#finalizar-compra').on('click', function() {
        // Reinicia la animación y abre el modal
        const animation = document.getElementById('animation');
        animation.stop();  // Detiene cualquier animación en progreso
        animation.play();  // Reproduce la animación desde el principio
        $('#animationModal').modal('show');  // Muestra el modal con la animación

        carrito = [];  // Limpia el carrito
        renderizarCarrito();
        actualizarBotonCarrito();

        // Cierra el modal cuando la animación termina y refresca la página
        animation.addEventListener('complete', () => {
            $('#animationModal').modal('hide');
            location.reload();  // Recarga la página
        }, { once: true });  // Se ejecuta solo una vez por cada clic
    });

    renderizarCarrito();
});
