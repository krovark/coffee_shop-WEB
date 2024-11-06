$(document).ready(function() {
    const productos = [
        { id: 1, nombre: "Camiseta", precio: 19.99 },
        { id: 2, nombre: "Pantalón", precio: 49.99 },
        { id: 3, nombre: "Zapatillas", precio: 79.99 }
    ];

    let carrito = [];

    function renderizarCarrito() {
        const elementosCarrito = $('#cart-items');
        elementosCarrito.empty();

        carrito.forEach(item => {
            const htmlItem = `
                <div class="cart-item">
                    <h5>${item.nombre}</h5>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
                    <button class="btn btn-sm btn-danger quitar-del-carrito" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            elementosCarrito.append(htmlItem);
        });

        actualizarTotalCarrito();
    }

    function actualizarTotalCarrito() {
        const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        $('#cart-total').text(`$${total.toFixed(2)}`);
        $('#cart-count').text(carrito.reduce((suma, item) => suma + item.cantidad, 0));
    }

    function agregarAlCarrito(idProducto) {
        const producto = productos.find(p => p.id === parseInt(idProducto));
        if (!producto) return;

        const itemCarrito = carrito.find(item => item.id === producto.id);

        if (itemCarrito) {
            itemCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        renderizarCarrito();
        actualizarBotonCarrito();
    }

    function quitarDelCarrito(idProducto) {
        carrito = carrito.filter(item => item.id !== parseInt(idProducto));
        renderizarCarrito();
        actualizarBotonCarrito();
    }

    function actualizarBotonCarrito() {
        const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);
        $('#cart-count').text(cantidadCarrito);
    }

    $('#cart-button').on('click', function(e) {
        e.preventDefault();
        $('#cart-sidebar').addClass('open');
        $('.cart-overlay').addClass('open');
    });

    $('.cart-overlay').on('click', function() {
        $('#cart-sidebar').removeClass('open');
        $('.cart-overlay').removeClass('open');
    });

    $('#close-cart').on('click', function() {
        $('#cart-sidebar').removeClass('open');
        $('.cart-overlay').removeClass('open');
    });

    $(document).on('click', '.add-to-cart', function() {
        const idProducto = $(this).data('id');
        agregarAlCarrito(idProducto);
    });

    $(document).on('click', '.quitar-del-carrito', function() {
        const idProducto = $(this).data('id');
        quitarDelCarrito(idProducto);
    });

    $('#finalizar-compra').on('click', finalizarCompra);

    function finalizarCompra() {
        $('#mensaje-agradecimiento').removeClass('d-none');
        setTimeout(function() {
            $('#mensaje-agradecimiento').addClass('d-none');
            $('#cart-sidebar').removeClass('open');
            $('.cart-overlay').removeClass('open');
            carrito = [];
            renderizarCarrito();
            actualizarBotonCarrito();
        }, 3000);
    }

    renderizarCarrito();
});