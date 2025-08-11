import LoginPage from '../../support/pages/LoginPage'
import ProductosPage from '../../support/pages/ProductosPage'

describe('Crear Producto', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillLogin('usuario@demo.com', 'password');
    LoginPage.submit();
    ProductosPage.visit();
  });

  it('Debe crear un producto nuevo', () => {
    ProductosPage.crearProducto('Camiseta', '19.99');
    ProductosPage.verificarProducto('Camiseta');
  });
});
