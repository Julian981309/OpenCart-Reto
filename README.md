INSTRUCCIONES DE EJECUCION

REQUISITOS:
- Node.js instalado (v14 o superior).
- Cypress instalado globalmente o como dependencia del proyecto.
- Repositorio clonado localmente desde GitHub.

INSTALACIÓN:
1. Clonar el repositorio:
  git clone <URL_DEL_REPOSITORIO>

2. Ingresar a la carpeta del proyecto:
   cd cypress/e2e/Reto_OpenCart/OpenCart.cy.js

3. Instalar dependencias:
   npm install

EJECUCIÓN DE LA PRUEBA:
1. Abrir Cypress en modo interactivo:
   npx cypress open
   - Seleccionar el archivo de prueba OpenCart.cy.js en la carpeta cypress/e2e.

2. O ejecutar en modo headless:
   npx cypress run --spec "cypress/e2e/Reto_OpenCart/OpenCart.cy.js"

REPORTES Y EVIDENCIAS:
- Capturas de pantalla: disponibles en cypress/screenshots.
- Videos (si está habilitado): en cypress/videos.
- Reportes generados: en la carpeta reports (si se configura un reporter como mochawesome).

DETALLES DEL FLUJO AUTOMATIZADO:
1. Agregar dos productos diferentes al carrito.
2. Visualizar y verificar que ambos productos estén en el carrito.
3. Realizar el proceso de compra como invitado.
4. Completar todos los datos requeridos y confirmar el pedido.
5. Validar que aparezca el mensaje final: “Your order has been placed!”.
