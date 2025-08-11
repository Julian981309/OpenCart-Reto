class LoginPage {
    visit(url) {
      cy.visit(url);
    }
  
    fillUsername(username) {
      cy.get('#Usuario').type(username);
    }
  
    fillPassword(password) {
      cy.get('#Contrasena').type(password);
    }
  
    submit() {
      cy.get('button[type="submit"]').click();
    }
  }
  
  export default LoginPage;