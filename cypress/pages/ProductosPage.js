class ProductosPage {
    irAPagina() {
      cy.contains("Productos").click();
    }
  
    crearProducto({ nombre, precio }) {
      cy.contains('Nuevo producto').click();
      cy.get('#NombreProducto').type(nombre);
      cy.get('#PrecioProducto').type(precio);
      cy.contains('Guardar').click();
    }
  
    verificarProducto(nombre) {
      cy.contains(nombre).should('exist');
    }
  
    actualizarProducto(nombreAntiguo, nombreNuevo) {
      cy.contains(nombreAntiguo).parent().contains('Editar').click();
      cy.get('#NombreProducto').clear().type(nombreNuevo);
      cy.contains('Actualizar').click();
    }
  
    eliminarProducto(nombre) {
      cy.contains(nombre).parent().contains('Eliminar').click();
      cy.contains('Confirmar').click();
    }
  }
  
  export default ProductosPage;
  