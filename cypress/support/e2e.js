// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Игнорируем ошибки CORS и рекламные скрипты
Cypress.on('uncaught:exception', (err, runnable) => {
  // Игнорируем ошибки, связанные с рекламой

 if(err.message.includes('adsbygoogle') || err.message.includes('TagError')) {
    return false;
 }

 if(err.message.includes('cross origin')) {
    return false;
 }

 return true;

})

beforeEach(() => {
   cy.visit('https://sekundomer.net/');
   cy.intercept({ method: 'POST', url: /mc\.yandex\.ru/ }, { statusCode: 204 }).as('blockYandex');
 });
