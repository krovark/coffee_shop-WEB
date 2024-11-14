$(document).ready(function() {
    let carritoCount = 0;

    
    function actualizarContadorCarrito() {
        $('#cart-count').text(carritoCount);
    }

    
    $(document).on('click', '.add-to-cart', function() {
        carritoCount++; 
        actualizarContadorCarrito(); 
    });

    // Inicializar el contador en 0 al cargar la página
    actualizarContadorCarrito();
});