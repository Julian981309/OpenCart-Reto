class DemoFormPage {
  llenarFormulario({ nombres, apellidos, email, telefono, institucion }) {
    cy.get('.btn-group.bootstrap-select.force-val').first().click();
    cy.get('.dropdown-menu.inner li').contains('Colegios').click();

    cy.get('#PruebaGratuita_nombres').type(nombres);
    cy.get('#PruebaGratuita_apellidos').type(apellidos);
    cy.get('.filter-option').eq(1).click();
    cy.get('.dropdown-menu.inner li').contains('Propietario').click();

    cy.get('#PruebaGratuita_correo').type(email);
    cy.get('#PruebaGratuita_telefono').type(telefono);

    cy.get('input[placeholder="Seleccione Municipio"]')
      .should('be.visible')
      .click({ force: true }).clear().type('Abejorral{enter}', { delay: 100 });

    cy.get('#PruebaGratuita_institucion').type(institucion);
    cy.get('#PruebaGratuita_acepto_condiciones').check({ force: true });
  }

  enviar() {
    cy.wait(60000);
    cy.contains('Iniciar Prueba Gratuita').click();
  }
}

export default DemoFormPage;
