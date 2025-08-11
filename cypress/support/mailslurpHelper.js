const { MailSlurp } = require('mailslurp-client');

function esperarCorreo(inboxId, timeout = 90000) {
  const apiKey = Cypress.env('MAILSLURP_API_KEY');

  if (!apiKey) {
    throw new Error('MAILSLURP_API_KEY no está definido en Cypress.env');
  }

  const mailslurp = new MailSlurp({ apiKey });
  return mailslurp.waitForLatestEmail(inboxId, timeout);
}

module.exports = {esperarCorreo};

// const { MailSlurp, CheckEmailBodyFeatureSupportResultsToJSON } = require('mailslurp-client');

// const apiKey = Cypress.env('90326dfddc4fa6a9aa917c4e75285293042b700ca9f7759d5cbe0451b12303e4');
// const mailslurp = new MailSlurp({ apiKey });

// function esperarCorreo(inboxId, timeout = 90000) {
//     return mailslurp.waitForLatestEmail(inboxId, timeout);

// // const esperarCorreo = async (inboxId, timeoutMs = 90000) => {
// //   const email = await mailslurp.waitForLatestEmail(inboxId, timeoutMs);
// //   return email;
// };

// module.exports = { esperarCorreo };





// const { MailSlurp } = require('mailslurp-client');

// const apiKey = "90326dfddc4fa6a9aa917c4e75285293042b700ca9f7759d5cbe0451b12303e4"; // reemplázala por tu API Key
// const mailslurp = new MailSlurp({ apiKey });

// const crearInbox = async () => {
//     try {
//         const inbox = await mailslurp.createInbox();
//         console.log(`📧 Inbox creado: ${inbox.emailAddress}`);
//         return inbox; // contiene id, emailAddress 
//     }catch (error) {
//         console.error('❌ Error creando inbox:', error.message);
//         throw error;
//       }
  
// };

// const esperarCorreo = async (inboxId, timeoutMs = 60000) => {
//     try {
//       console.log(`⏳ Esperando correo en inbox: ${inboxId} con timeout: ${timeoutMs}ms`);
//       const email = await mailslurp.waitForLatestEmail(inboxId, timeoutMs);
//       console.log(`✅ Correo recibido:\nAsunto: ${email.subject}\nContenido:\n${email.body}`);
//       return email;
//     } catch (error) {
//       console.error('❌ Error esperando correo:', error.message);
//       throw error;
//     }
//   };

// module.exports = { crearInbox, esperarCorreo };
