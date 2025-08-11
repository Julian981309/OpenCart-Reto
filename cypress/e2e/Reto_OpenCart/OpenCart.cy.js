/// <reference types="cypress" />
// para que funcione los comandos
require('cypress-xpath')
require('cypress-plugin-tab')
describe("   ", () => {
   
    it("Reto Tecnico Open Cart", () => {
        cy.visit("http://opencart.abstracta.us/")
        cy.title().should('eq','Your Store')
        cy.wait(1000)
        // Seleccionar productos
        cy.get('[onclick="cart.add(\'43\');"]').scrollIntoView().should("be.visible").click()
        cy.get('[onclick="cart.add(\'40\');"]').scrollIntoView().should("be.visible").click()
        // Verificar que los productos se han añadido al carrito
        cy.get("#cart-total").should("be.visible").click().wait(2000)
        cy.contains(' View Cart').find('.fa.fa-shopping-cart').click()
        // Validar que los productos están en el carrito
        cy.get(".pull-right > .btn").scrollIntoView().should("be.visible").contains("Checkout").click()
        cy.origin('https://opencart.abstracta.us/', () => { //Cambiamos a dominio
            // Seleccionar la opción de checkout como invitado
            cy.get('input[type="radio"][name="account"][value="guest"]').click()
            cy.get('#button-account').should("be.visible").click()
            // Llenar los datos del formulario de checkout
            cy.get('#input-payment-firstname').should("be.visible").type("Andres")
            cy.get('#input-payment-lastname').should("be.visible").type("Valencia")
            cy.get('#input-payment-email').should("be.visible").type("ramirez@test.com")
            cy.get('#input-payment-telephone').should("be.visible").type("123456789")
            cy.get('#input-payment-address-1').should("be.visible").type("Calle Falsa 123")
            cy.get('#input-payment-city').should("be.visible").type("Ciudad Falsa") 
            cy.get('#input-payment-postcode').should("be.visible").type("12345")
            cy.get('#input-payment-country').should("be.visible").select("Colombia")
            cy.get('#input-payment-zone').should("be.visible").select("Antioquia")
            // Continuar con el proceso de checkout
            cy.get('#button-guest').scrollIntoView().should("be.visible").click().wait(3000)
            // Seleccionar el método de envío
            cy.get('#button-shipping-method').scrollIntoView().should("be.visible").click()
            // Seleccionar el método de pago
            cy.get('input[type="checkbox"][name="agree"][value="1"]').click()
            // Aceptar los términos y condiciones
            cy.get('#button-payment-method').scrollIntoView().should("be.visible").click()
            // Confirmar el pedido
            cy.get('#button-confirm').scrollIntoView().should("be.visible").click()
            // Validar que el pedido se ha realizado correctamente.
            cy.screenshot('Prueba',{capture: 'viewport'});

        });
       
    })

})
