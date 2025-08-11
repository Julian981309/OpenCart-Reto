import HomePage from '../../pages/HomePage';
import DemoFormPage from '../../pages/DemoFormPage';
import ProductosPage from '../../pages/ProductosPage';
import { esperarCorreo } from '../../support/mailslurpHelper';

const home = new HomePage();
const demoForm = new DemoFormPage();
const productos = new ProductosPage();

const inbox = {
  id: '41d7dc17-e9a4-4c62-a4d6-51399e6eb3a6',
  emailAddress: '41d7dc17-e9a4-4c62-a4d6-51399e6eb3a6@mailslurp.biz'
};

describe('Flujo completo: crear demo, login y CRUD de productos', () => {

  const nuevaContrasena = 'PasswordTemporal123!';

  it('Llena formulario y lo envía', () => {
    cy.visit('https://q10.com/PruebaGratuita/Colombia/Profesional');
    cy.wait(2000);
    //home.clickPruebaGratis();
    demoForm.llenarFormulario({
      nombres: 'Juan',
      apellidos: 'Pérez',
      email: inbox.emailAddress,
      telefono: '3001234567',
      institucion: 'Instituto QA'
    });
    demoForm.enviar();
  });

  it('Espera el correo y realiza login', () => {
    cy.wrap(null, { timeout: 120000 }).then(() => {
      return esperarCorreo(inbox.id)
      .catch((error) => {
        cy.log('Error al esperar el correo:', JSON.stringify(error));
        throw new Error('Fallo esperando el correo. Verifica la API Key y el inboxId.');
      });
    }).then((email) => {
      cy.log(`Correo recibido: ${email.subject}`);
      const body = email.body;      

      const urlActivacion = body.match(/https?:\/\/[^\s"]+/)?.[0];
      const usuario = body.match(/[a-zA-Z0-9._%+-]+@mailslurp\.biz/)?.[0];

      expect(urlActivacion, 'URL de activación encontrada').to.not.be.null;
      expect(usuario, 'Usuario encontrado').to.not.be.null;

      if (!urlActivacion || !usuario) {
        throw new Error('No se encontró URL o usuario en el cuerpo del correo.');
      }

      cy.visit(urlActivacion);

      const nuevaContrasena = 'PasswordTemporal123!';  
      cy.get('#Contrasena').type(nuevaContrasena);
      cy.get('#ConfirmarContrasena').type(nuevaContrasena);
      cy.get('#submit-btn').click();

      cy.url().should('include', '/login');
    });  
  });

  it('Realiza login con la nueva cuenta', () => {
    cy.wrap(null, { timeout: 120000 }).then(() => {
      return esperarCorreo(inbox.id);
    }).then((email) => {
      const body = email.body;
      const urlLogin = body.match(/https?:\/\/[^\s"]+/)?.[0];
      const usuario = body.match(/[a-zA-Z0-9._%+-]+@mailslurp\.biz/)?.[0];

      expect(urlLogin, 'URL de login encontrada').to.not.be.null;
      expect(usuario, 'Usuario encontrado').to.not.be.null;

      cy.visit(urlLogin);
      cy.get('#Usuario').type(usuario);
      cy.get('#Contrasena').type(nuevaContrasena);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  });
    
  it('CRUD de productos', () => {
    productos.irAPagina();
    productos.crearProducto({ nombre: 'Producto QA', precio: 12345 });
    productos.verificarProducto('Producto QA');

    productos.actualizarProducto('Producto QA', 'Producto Actualizado');
    productos.verificarProducto('Producto Actualizado');

    productos.eliminarProducto('Producto Actualizado');
    cy.contains('Producto Actualizado').should('not.exist');
  });
});
