$(document).ready(function() {
    let carritoCount = 0;

    // Función para actualizar el número del contador en el carrito
    function actualizarContadorCarrito() {
        $('#cart-count').text(carritoCount);
    }

    // Evento para añadir al carrito
    $(document).on('click', '.add-to-cart', function() {
        carritoCount++; // Incrementa el contador del carrito
        actualizarContadorCarrito(); // Actualiza el contador visual
    });

    // Inicializar el contador en 0 al cargar la página
    actualizarContadorCarrito();
});